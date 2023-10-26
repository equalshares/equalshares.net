function getJavaScriptCodeSnippet(choices) {
    const fractions = choices.accuracy == "fractions";

    let code = "";
    if (fractions) {
        code += fractionImport();
    } else {
        code += `function sum(xs) {
    return xs.reduce((a, b) => a + b, 0);
}

`;
    }

    code += mainFunction(choices);

    if (choices.completion == "utilitarian" || choices.completion == "add1u" || 
            choices.comparison == "exclusionRatio" || choices.comparison == "satisfaction") {
        code += utilitarianCompletion(choices);
    }

    if (choices.tieBreaking != "") {
        code += tieBreaking(choices);
    }

    code += fixedBudgetFunction(choices);
    return code;
}

function fractionImport() {
    return `import Fraction from './libraries/fraction.js';

function sum(xs) {
    return xs.reduce((a, b) => a.add(b), new Fraction(0));
}

`;
}

function tieBreaking(choices) {
    const scores = choices.ballots == "score";
    let code = `function breakTies(N, C, cost, ${scores ? "totalUtility" : "approvers"}, choices) {
    let remaining = [...choices];
    `;
    for (let method of choices.tieBreaking.split(",")) {
        if (method == "maxVotes") {
            const measure = scores ? "totalUtility[c]" : "approvers[c].length";
            code += `const bestCount = Math.max(...remaining.map(c => ${measure}));
    remaining = remaining.filter(c => ${measure} == bestCount);
    `;
        } else if (method == "minCost") {
            code += `const bestCost = Math.min(...remaining.map(c => cost[c]));
    remaining = remaining.filter(c => cost[c] == bestCost);
    `;
        } else if (method == "maxCost") {
            code += `const bestCost = Math.max(...remaining.map(c => cost[c]));
    remaining = remaining.filter(c => cost[c] == bestCost);
    `;
        }
    }
    code += `return remaining;
}

`;
    return code;
}

function comparisonStep(choices) {
    if (choices.comparison == "none") {
        return "";
    }
    const scores = choices.ballots == "score";
    let code = `    // comparison step
    const greedy = utilitarianCompletion(N, C, cost, ${scores ? "totalUtility" : "approvers"}, B, []);
    let prefersMES = 0;
    let prefersGreedy = 0;
    `;
    if (choices.comparison == "satisfaction") {
        if (scores) {
            code += `for (let i of N) {
        const mesSatisfaction = sum(mes.map(c => u[i][c]));
        const greedySatisfaction = sum(greedy.map(c => u[i][c]));
        if (mesSatisfaction > greedySatisfaction) {
            prefersMES++;
        } else if (greedySatisfaction > mesSatisfaction) {
            prefersGreedy++;
        }
    }
    `;  
        } else {
            code += `const mesSatisfaction = {};
    const greedySatisfaction = {};
    for (let [candidates, satisfaction] of [[winners, mesSatisfaction], [greedy, greedySatisfaction]]) {
        for (let c of candidates) {
            for (let i of approvers[c]) {
                if (!satisfaction[i]) {
                    satisfaction[i] = 0;
                }
                satisfaction[i]++;
            }
        }
    }
    for (let i of N) {
        if (mesSatisfaction[i] > greedySatisfaction[i]) {
            prefersMES++;
        } else if (greedySatisfaction[i] > mesSatisfaction[i]) {
            prefersGreedy++;
        }
    }
    `;
        }
    } else if (choices.comparison == "exclusionRatio") {
        code += `// by taking a union of the approvers of a committee, 
    // figure out which voters approve at least one winner
    const mesApprovals = new Set();
    for (let c of mes) {
        for (let i of approvers[c]) {
            mesApprovals.add(i);
        }
    }
    const greedyApprovals = new Set();
    for (let c of greedy) {
        for (let i of approvers[c]) {
            greedyApprovals.add(i);
        }
    }
    for (let i of N) {
        if (mesApprovals.has(i) && !greedyApprovals.has(i)) {
            prefersMES++;
        } else if (greedyApprovals.has(i) && !mesApprovals.has(i)) {
            prefersGreedy++;
        }
    }
    `;
    }
    code += `if (prefersGreedy > prefersMES) {
        // replace winners with greedy
        mes = greedy;
    }
`;
    return code;
}

function mainFunction(choices) {
    const scores = choices.ballots == "score";
    let code = `function equalShares(N, C, cost, ${scores ? "u" : "approvers"}, B) {
    `;
    if (scores) {
        // compute approvers and totalUtility from u
        code += `const approvers = Object.fromEntries(C.map(c => [c, N.filter(i => u[i][c] > 0)]));
    const totalUtility = Object.fromEntries(C.map(c => [c, sum(N.map(i => u[i][c]))]));
    `;
    }
    code += `let mes = equalSharesFixedBudget(N, C, cost, ${scores ? "u, totalUtility, " : ""}approvers, B);
`;
    if (choices.completion.includes("add1")) {
        code += `    // add1 completion
`;
        const integral = choices.add1options.includes("integral");
        code += `    ${integral ? "// start with integral per-voter budget\n    " : ""}let budget = ${integral ? "Math.floor(B / N.length) * N.length" : "B"};
    `;
    const exhaustive = choices.add1options.includes("exhaustive");
    if (exhaustive) {
        code += `let currentCost = sum(mes.map(c => cost[c]));
    while (true) {
        // is current outcome exhaustive?
        let isExhaustive = true;
        for (let extra of C) {
            if (!mes.includes(extra) && currentCost + cost[extra] <= B) {
                isExhaustive = false;
                break;
            }
        }
        // if so, stop
        if (isExhaustive) {
            break;
        }
        `;
    } else {
        code += `while (true) {
        `;
    }
    code += `// would the next highest budget work?
        let nextBudget = budget + N.length;
        let nextMes = equalSharesFixedBudget(N, C, cost, ${scores ? "u, totalUtility, " : ""}approvers, nextBudget);
        `;
    if (exhaustive) {
        code += `currentCost = sum(nextMes.map(c => cost[c]));
        if (currentCost <= B) {
            `;
    } else {
        code += `if (sum(nextMes.map(c => cost[c])) <= B) {
            `;
    }
    code += `// yes, so continue with that budget
            budget = nextBudget;
            mes = nextMes;
        } else {
            // no, so stop
            break;
        }
    }
`;
    }
    if (choices.completion == "utilitarian" || choices.completion == "add1u") {
        code += `    // utilitarian completion${choices.completion == "add1u" ? " after add1 (as part of add1u)" : ""}
    mes = utilitarianCompletion(N, C, cost, ${scores ? "totalUtility" : "approvers"}, B, mes);
`;
    }
    code += comparisonStep(choices);
    code += `    return mes;
}

`;
    return code;
}

function utilitarianCompletion(choices) {
    const scores = choices.ballots == "score";
    let code = `function utilitarianCompletion(N, C, cost, ${scores ? "totalUtility" : "approvers"}, B, alreadyWinners) {
    let winners = [...alreadyWinners];
    let costSoFar = sum(winners.map(c => cost[c]));
    // sort candidates by score
    let sortedC = [...C];
    `;
    if (scores) {
        code += `sortedC.sort((a, b) => totalUtility[b] - totalUtility[a]);
    `;
    } else {
        code += `sortedC.sort((a, b) => approvers[b].length - approvers[a].length);
    `;
    }
    code += `// for each candidate in order of decreasing score, 
    // try to add it to the committee
    for (let c of sortedC) {
        if (winners.includes(c) || costSoFar + cost[c] > B) {
            continue;
        }
        winners.push(c);
        costSoFar += cost[c];
    }
    return winners;
}

`;
    return code;
}

function fixedBudgetFunction(choices) {
    const scores = choices.ballots == "score";
    const fractions = choices.accuracy == "fractions";
    // precompute some code pieces that depend on scores and fractions
    let initialEffVoteCount;
    if (scores) {
        initialEffVoteCount = fractions ? "new Fraction(totalUtility[c])" : "totalUtility[c]";
    } else {
        initialEffVoteCount = fractions ? "new Fraction(approvers[c].length)" : "approvers[c].length";
    }
    let effVoteCountEquation;
    if (scores) {
        effVoteCountEquation = fractions ? "new Fraction(cost[c]).div(paymentFactor)" : "cost[c] / paymentFactor";
    } else {
        effVoteCountEquation = fractions ? "new Fraction(cost[c]).div(maxPayment)" : "cost[c] / maxPayment";
    }
    let approversSort;
    if (scores) {
        if (fractions) {
            approversSort = `(a, b) => budget[a].div(u[i][a]).compare(budget[b].div(u[i][b]))`;
        } else {
            approversSort = `(a, b) => budget[a]/u[i][a] - budget[b]/u[i][b]`;
        }
    } else {
        if (fractions) {
            approversSort = `(a, b) => budget[a].compare(budget[b])`;
        } else {
            approversSort = `(a, b) => budget[a] - budget[b]`;
        }
    }
    let denominatorReduction;
    if (scores) {
        denominatorReduction = fractions ? "denominator = denominator.sub(u[i][c])" : "denominator -= u[i][c]";
    } else {
        denominatorReduction = fractions ? "denominator = denominator.sub(1)" : "denominator -= 1";
    }
    let payEntireBudgetCondition;
    if (scores) {
        payEntireBudgetCondition = fractions ? "paymentFactor.mul(u[i][c]).compare(budget[i]) > 0" : "paymentFactor * u[i][c] > budget[i]";
    } else {
        payEntireBudgetCondition = fractions ? "maxPayment.compare(budget[i]) > 0" : "maxPayment > budget[i]";
    }
    let chargingCode;
    if (scores) {
        chargingCode = `let paymentFactor = ${fractions ? "new Fraction(cost[best]).div(bestEffVoteCount)" : "cost[best] / bestEffVoteCount"};
        for (let i of approvers[best]) {
            const payment = ${fractions ? "paymentFactor.mul(u[i][best])" : "paymentFactor * u[i][best]"};
            if (${fractions ? "budget[i].compare(payment) > 0" : "budget[i] > payment"}) {
                budget[i] ${fractions ? "= budget[i].sub(payment)" : "-= payment"};
            } else {
                budget[i] = ${fractions ? "new Fraction(0)" : "0"};
            }
        }`;
    } else {
        chargingCode = `let bestMaxPayment = ${fractions ? "new Fraction(cost[best]).div(bestEffVoteCount)" : "cost[best] / bestEffVoteCount"};
        for (let i of approvers[best]) {
            if (${fractions ? "budget[i].compare(bestMaxPayment) > 0" : "budget[i] > bestMaxPayment"}) {
                budget[i] ${fractions ? "= budget[i].sub(bestMaxPayment)" : "-= bestMaxPayment"};
            } else {
                budget[i] = ${fractions ? "new Fraction(0)" : "0"};
            }
        }`;
    }
    return `function equalSharesFixedBudget(N, C, cost, ${scores ? "u, totalUtility, " : ""}approvers, B) {
    let budget = {};
    for (let i of N) {
        budget[i] = ${fractions ? "new Fraction(B).div(N.length)" : "B / N.length"};
    }
    let remaining = new Map(); // remaining candidate -> previous effective vote count
    for (let c of C) {
        if (cost[c] > 0 && approvers[c].length > 0) {
            remaining.set(c, ${initialEffVoteCount});
        }
    }
    let winners = [];
    while (true) {
        let best = [];
        let bestEffVoteCount = 0;
        // go through remaining candidates in order of decreasing previous effective vote count
        let remainingSorted = [...remaining.keys()];
        remainingSorted.sort((a, b) => ${fractions ? "remaining.get(b).compare(remaining.get(a))" : "remaining.get(b) - remaining.get(a)"});
        for (let c of remainingSorted) {
            let previousEffVoteCount = remaining.get(c);
            if (${fractions ? "previousEffVoteCount.compare(bestEffVoteCount) < 0" : "previousEffVoteCount < bestEffVoteCount"}) {
                // c cannot be better than the best so far
                break;
            }
            const moneyBehindNow = sum(approvers[c].map(i => budget[i]))
            if (${fractions ? "moneyBehindNow.compare(cost[c]) < 0" : "moneyBehindNow < cost[c]"}) {
                // c is not affordable
                remaining.delete(c);
                continue;
            }
            // calculate the effective vote count of c
            approvers[c].sort((a, b) => ${approversSort});
            let paidSoFar = ${fractions ? "new Fraction(0)" : "0"};
            let denominator = ${initialEffVoteCount};
            for (let i of approvers[c]) {
                // compute payment if remaining approvers pay ${scores ? "proportional to their utility" : "equally"}
                const ${scores ? "paymentFactor" : "maxPayment"} = ${fractions ? "new Fraction(cost[c]).sub(paidSoFar).div(denominator)" : "(cost[c] - paidSoFar) / denominator"}; 
                const effVoteCount = ${fractions ? "new Fraction(cost[c]).div(maxPayment)" : "cost[c] / maxPayment"};
                if (${payEntireBudgetCondition}) {
                    // i cannot afford the payment, so pays entire remaining budget
                    paidSoFar ${fractions ? "= paidSoFar.add(budget[i])" : "+= budget[i]"};
                    ${denominatorReduction};
                } else {
                    // i (and all later approvers) can afford the payment; stop here
                    remaining.set(c, effVoteCount);
                    if (${fractions ? "effVoteCount.compare(bestEffVoteCount) > 0" : "effVoteCount > bestEffVoteCount"}) {
                        bestEffVoteCount = effVoteCount;
                        best = [c];
                    } else if (${fractions ? "effVoteCount.equals(bestEffVoteCount)" : "effVoteCount == bestEffVoteCount"}) {
                        best.push(c);
                    }
                    break;
                }
            }
        }
        if (best.length == 0) {
            // no remaining candidates are affordable
            break;
        }
        ${choices.tieBreaking != "" ? `best = breakTies(N, C, cost, ${scores ? "totalUtility" : "approvers"}, best);
        ` : ""}if (best.length > 1) {
            throw new Error("Tie-breaking failed: tie between projects " + best.join(", ") 
                + " could not be resolved. Another tie-breaking needs to be added.");
        }
        best = best[0];
        winners.push(best);
        remaining.delete(best);
        // charge approvers of best
        ${chargingCode}
    }
    return winners;
}`;
}

export default getJavaScriptCodeSnippet;