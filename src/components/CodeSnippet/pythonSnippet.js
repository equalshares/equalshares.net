function getPythonCodeSnippet(choices) {
    const fractions = choices.accuracy == "fractions";

    let code = "";
    if (fractions) {
        code += fractionImport();
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
    return `from fractions import Fraction

`;
}

function tieBreaking(choices) {
    const scores = choices.ballots == "score";
    let code = `def break_ties(voters, projects, cost, ${scores ? "total_utility" : "approvers"}, choices):
    remaining = choices.copy()
    `;
    for (let method of choices.tieBreaking.split(",")) {
        if (method == "maxVotes") {
            const measure = scores ? "total_utility[c]" : "len(approvers[c])";
            code += `best_count = max(${measure} for c in remaining)
    remaining = [c for c in remaining if ${measure} == best_count]
    `;
        } else if (method == "minCost") {
            code += `best_cost = min(cost[c] for c in remaining)
    remaining = [c for c in remaining if cost[c] == best_cost]
    `;
        } else if (method == "maxCost") {
            code += `best_cost = max(cost[c] for c in remaining)
    remaining = [c for c in remaining if cost[c] == best_cost]
    `;
        }
    }
    code += `return remaining

`;
    return code;
}

function comparisonStep(choices) {
    if (choices.comparison == "none") {
        return "";
    }
    const scores = choices.ballots == "score";
    let code = `    # comparison step
    greedy = utilitarian_completion(voters, projects, cost, ${scores ? "total_utility" : "approvers"}, total_budget, [])
    prefers_MES = 0
    prefers_greedy = 0
    `;
    if (choices.comparison == "satisfaction") {
        if (scores) {
            code += `for i in voters:
        mes_satisfaction = sum(u[i][c] for c in mes)
        greedy_satisfaction = sum(u[i][c] for c in greedy)
        if mes_satisfaction > greedy_satisfaction:
            prefers_MES += 1
        elif greedy_satisfaction > mes_satisfaction:
            prefers_greedy += 1
    `
        } else {
            code += `mes_satisfaction = {i : 0 for i in voters}
    greedy_satisfaction = {i : 0 for i in voters}
    for c in mes:
        for i in approvers[c]:
            mes_satisfaction[i] += 1
    for c in greedy:
        for i in approvers[c]:
            greedy_satisfaction[i] += 1
    for i in voters:
        if mes_satisfaction[i] > greedy_satisfaction[i]:
            prefers_MES += 1
        elif greedy_satisfaction[i] > mes_satisfaction[i]:
            prefers_greedy += 1
    `;
        }
    } else if (choices.comparison == "exclusionRatio") {
        code += `# by taking a union of the approvers of a committee, 
    # figure out which voters approve at least one winner
    mes_approvals = set()
    for c in mes:
        for i in approvers[c]:
            mes_approvals.add(i)
    greedy_approvals = set()
    for c in greedy:
        for i in approvers[c]:
            greedy_approvals.add(i)
    for i in voters:
        if i in mes_approvals and i not in greedy_approvals:
            prefers_MES += 1
        elif i in greedy_approvals and i not in mes_approvals:
            prefers_greedy += 1
    `;
    }
    code += `if prefers_greedy > prefers_MES:
        # replace winners with greedy
        mes = greedy
`;
    return code;
}

function mainFunction(choices) {
    const scores = choices.ballots == "score";
    let code = `def equal_shares(voters, projects, cost, ${scores ? "u" : "approvers"}, total_budget):
    `;
    if (scores) {
        // compute approvers and total_utility from u
        code += `approvers = {c: [i for i in voters if u[i][c] > 0] for c in projects}
    total_utility = {c: sum(u[i][c] for i in voters) for c in projects}
    `;
    }
    code += `mes = equal_shares_fixed_budget(voters, projects, cost, ${scores ? "u, total_utility, " : ""}approvers, total_budget)
`;
    if (choices.completion.includes("add1")) {
        code += `    # add1 completion
`;
        const integral = choices.add1options.includes("integral");
        code += `    ${integral ? "# start with integral per-voter budget\n    " : ""}budget = ${integral ? "int(total_budget / len(voters)) * len(voters)" : "total_budget"}
    `;
        const exhaustive = choices.add1options.includes("exhaustive");
        if (exhaustive) {
            code += `current_cost = sum(cost[c] for c in mes)
    while True:
        # is current outcome exhaustive?
        is_exhaustive = True
        for extra in projects:
            if extra not in mes and current_cost + cost[extra] <= total_budget:
                is_exhaustive = False
                break
        # if so, stop
        if is_exhaustive:
            break
        `;
        } else {
            code += `while True:
        `;
        }
        code += `# would the next highest budget work?
        next_budget = budget + len(voters)
        next_mes = equal_shares_fixed_budget(voters, projects, cost, ${scores ? "u, total_utility, " : ""}approvers, next_budget)
        `;
        if (exhaustive) {
            code += `current_cost = sum(cost[c] for c in next_mes)
        if current_cost <= total_budget:
            `;
        } else {
            code += `if sum(cost[c] for c in next_mes) <= total_budget:
            `;
        }
        code += `# yes, so continue with that budget
            budget = next_budget
            mes = next_mes
        else:
            # no, so stop
            break
`;
    }
    if (choices.completion == "utilitarian" || choices.completion == "add1u") {
        code += `    # utilitarian completion${choices.completion == "add1u" ? " after add1 (as part of add1u)" : ""}
    mes = utilitarian_completion(voters, projects, cost, ${scores ? "total_utility" : "approvers"}, total_budget, mes)
`;
    }
    code += comparisonStep(choices); // this function call will also need to be translated to produce Python code
    code += `    return mes

`;
    return code;
}


function utilitarianCompletion(choices) {
    const scores = choices.ballots == "score";
    let code = `def utilitarian_completion(voters, projects, cost, ${scores ? "total_utility" : "approvers"}, total_budget, already_winners):
    winners = list(already_winners)
    cost_so_far = sum(cost[c] for c in winners)
    # sort candidates by score
    sorted_projects = `;
    if (scores) {
        code += `sorted(projects, key=lambda c: total_utility[c], reverse=True)
    `;
    } else {
        code += `sorted(projects, key=lambda c: len(approvers[c]), reverse=True)
    `;
    }
    code += `# for each candidate in order of decreasing score, 
    # try to add it to the committee
    for c in sorted_projects:
        if c in winners or cost_so_far + cost[c] > total_budget:
            continue
        winners.append(c)
        cost_so_far += cost[c]
    return winners

`;
    return code;
}

function fixedBudgetFunction(choices) {
    const scores = choices.ballots == "score";
    const fractions = choices.accuracy == "fractions";
    // precompute some code pieces that depend on scores and fractions
    let initial_eff_vote_count;
    if (scores) {
        initial_eff_vote_count = "total_utility[c]";
    } else {
        initial_eff_vote_count = "len(approvers[c])";
    }
    let eff_vote_count_equation;
    if (scores) {
        eff_vote_count_equation = fractions ? "Fraction(cost[c], payment_factor)" : "cost[c] / payment_factor";
    } else {
        eff_vote_count_equation = fractions ? "Fraction(cost[c], max_payment)" : "cost[c] / max_payment";
    }
    let approvers_sort;
    if (scores) {
        if (fractions) {
            approvers_sort = `Fraction(budget[i], u[i][c])`;
        } else {
            approvers_sort = `budget[i] / u[i][c]`;
        }
    } else {
        if (fractions) {
            approvers_sort = `budget[i]`;
        } else {
            approvers_sort = `budget[i]`;
        }
    }
    let denominator_reduction;
    if (scores) {
        denominator_reduction = fractions ? "denominator -= u[i][c]" : "denominator -= u[i][c]";
    } else {
        denominator_reduction = fractions ? "denominator -= 1" : "denominator -= 1";
    }
    let pay_entire_budget_condition;
    if (scores) {
        pay_entire_budget_condition = fractions ? "payment_factor * u[i][c] > budget[i]" : "payment_factor * u[i][c] > budget[i]";
    } else {
        pay_entire_budget_condition = fractions ? "max_payment > budget[i]" : "max_payment > budget[i]";
    }
    let charging_code;
    if (scores) {
        charging_code = `payment_factor = ${fractions ? "Fraction(cost[best], best_eff_vote_count)" : "cost[best] / best_eff_vote_count"}
        for i in approvers[best]:
            payment = ${fractions ? "payment_factor * u[i][best]" : "payment_factor * u[i][best]"}
            if budget[i] > payment:
                budget[i] -= payment
            else:
                budget[i] = 0`;
    } else {
        charging_code = `best_max_payment = ${fractions ? "Fraction(cost[best], best_eff_vote_count)" : "cost[best] / best_eff_vote_count"}
        for i in approvers[best]:
            if budget[i] > best_max_payment:
                budget[i] -= best_max_payment
            else:
                budget[i] = 0`;
    }
    return `def equal_shares_fixed_budget(voters, projects, cost, ${scores ? "u, total_utility, " : ""}approvers, total_budget):
    budget = {i: ${fractions ? "Fraction(total_budget, len(voters))" : "total_budget / len(voters)"} for i in voters}
    remaining = {} # remaining candidate -> previous effective vote count
    for c in projects:
        if cost[c] > 0 and len(approvers[c]) > 0:
            remaining[c] = ${initial_eff_vote_count}
    winners = []
    while True:
        best = []
        best_eff_vote_count = 0
        # go through remaining candidates in order of decreasing previous effective vote count
        remaining_sorted = sorted(remaining, key=lambda c: remaining[c], reverse=True)
        for c in remaining_sorted:
            previous_eff_vote_count = remaining[c]
            if previous_eff_vote_count < best_eff_vote_count:
                # c cannot be better than the best so far
                break
            money_behind_now = sum(budget[i] for i in approvers[c])
            if money_behind_now < cost[c]:
                # c is not affordable
                del remaining[c]
                continue
            # calculate the effective vote count of c
            approvers[c].sort(key=lambda i: ${approvers_sort})
            paid_so_far = 0
            denominator = ${initial_eff_vote_count}
            for i in approvers[c]:
                # compute payment if remaining approvers pay ${scores ? "proportional to their utility" : "equally"}
                ${scores ? "payment_factor" : "max_payment"} = ${fractions ? "Fraction(cost[c] - paid_so_far, denominator)" : "(cost[c] - paid_so_far) / denominator"}
                eff_vote_count = ${eff_vote_count_equation}
                if ${pay_entire_budget_condition}:
                    # i cannot afford the payment, so pays entire remaining budget
                    paid_so_far += budget[i]
                    ${denominator_reduction}
                else:
                    # i (and all later approvers) can afford the payment; stop here
                    remaining[c] = eff_vote_count
                    if eff_vote_count > best_eff_vote_count:
                        best_eff_vote_count = eff_vote_count
                        best = [c]
                    elif eff_vote_count == best_eff_vote_count:
                        best.append(c)
                    break
        if not best:
            # no remaining candidates are affordable
            break
        ${choices.tieBreaking != "" ? `best = break_ties(voters, projects, cost, ${scores ? "total_utility" : "approvers"}, best)
        ` : ""}if len(best) > 1:
            raise Exception(f"Tie-breaking failed: tie between projects {best} could not be resolved. Another tie-breaking needs to be added.")
        best = best[0]
        winners.append(best)
        del remaining[best]
        # charge the approvers of best
        ${charging_code}
    return winners`;
}

export default getPythonCodeSnippet;
