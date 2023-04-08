function sum(xs) {
    return xs.reduce((a, b) => a + b, 0);
}

// for a particular alternative, spread its cost among voters, and return spending and rho
function spreadCost(N, budgets, cost, u) {
    let u_ = {};
    // cost utility (probably refactor this)
    for (let i of N) {
        u_[i] = u[i] * cost;
    }
    let approvers = N.filter(i => u_[i] > 0);
    let totalUtility = sum(approvers.map(i => u_[i]));
    let availableMoney = sum(approvers.map(i => budgets[i]));
    if (availableMoney < cost) {
        return { affordable: false, availableMoney: availableMoney };
    }
    approvers.sort((i, j) => budgets[i] / u_[i] - budgets[j] / u_[j]);
    let paid_so_far = 0;
    let denominator = totalUtility;
    for (let j = 0; j < approvers.length; j++) {
        let rho = (cost - paid_so_far) / denominator;
        if (rho * u_[approvers[j]] <= budgets[approvers[j]] + 0.0001) {
            let result = { affordable: true, spending: {}, rho: rho };
            for (let i of N) {
                result.spending[i] = 0;
            }
            for (let i = 0; i < approvers.length; i++) {
                result.spending[approvers[i]] = Math.min(rho * u_[approvers[i]], budgets[approvers[i]]);
            }
            result.spending = [...Object.values(result.spending)];
            return result;
        }
        paid_so_far += budgets[approvers[j]];
        denominator -= u_[approvers[j]];
    }
}

function calculateRuleFixedBudget(N, C, cost, budget, u) {
    let rounds = [];
    // start the algorithm
    let budgets = {};
    for (let i of N) {
        budgets[i] = budget / N.length;
    }
    let remaining = [...C];
    let committee = [];
    while (remaining.length > 0) {
        // starting a new round
        let costDistribution = {};
        let affordables = [];
        for (let j of remaining) {
            costDistribution[j] = spreadCost(N, budgets, cost[j], u[j]);
            if (costDistribution[j].affordable) {
                affordables.push(j);
            }
        }
        if (affordables.length === 0) {
            // no more projects can be afforded
            rounds.push({
                type: "none-afforded",
                N: N,
                C: C,
                budget: budget,
                budgets: [...Object.values(budgets)], // make a copy
                remaining: remaining,
                committee: committee,
                costDistribution: costDistribution,
                selected: null,
            });
            break;
        }
        // select the project with the lowest rho
        let rhos = affordables.map(j => costDistribution[j].rho);
        let selected = affordables[rhos.indexOf(Math.min(...rhos))];
        rounds.push({
            type: "project-selected",
            N: N,
            C: C,
            budget: budget,
            budgets: [...Object.values(budgets)],
            remaining: remaining,
            committee: committee,
            costDistribution: costDistribution,
            selected: selected,
        });
        // update budgets
        for (let i of N) {
            budgets[i] -= costDistribution[selected].spending[i];
        }
        // remove selected project from remaining
        remaining = remaining.filter(j => j !== selected);
        // add selected project to committee
        committee.push(selected);
    }
    if (remaining.length === 0) {
        rounds.push({
            type: "none-remaining",
            N: N,
            C: C,
            budget: budget,
            budgets: [...Object.values(budgets)],
            remaining: remaining,
            committee: committee,
            costDistribution: {},
            selected: null,
        });
    }
    return rounds;
}

function costOfCommittee(cost, committee) {
    return sum(committee.map(j => cost[j]));
}

export function calculateRule(N, C, cost, budget, u) {
    var rounds = calculateRuleFixedBudget(N, C, cost, budget, u);
    for (var i = 101; i <= 250; i++) {
        // check if current committee is exhaustive
        let committee = rounds[rounds.length - 1].committee;
        if (committee !== null) {
            let remaining = rounds[rounds.length - 1].remaining;
            let minCost = Math.min(...remaining.map(j => cost[j]));
            if (costOfCommittee(cost, committee) + minCost > budget) {
                break;
            }
        }
        let newRounds = calculateRuleFixedBudget(N, C, cost, budget * i / 100, u);
        committee = newRounds[newRounds.length - 1].committee;
        // check if next committee exceeds budget
        if (committee !== null && costOfCommittee(cost, committee) > budget) {
            break;
        }
        rounds = newRounds;
    }
    return rounds;
}