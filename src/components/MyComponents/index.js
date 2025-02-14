import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useColorMode } from '@docusaurus/theme-common';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { Currency } from '@site/src/components/CurrencyChoice';

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

// import DWChart from 'react-datawrapper-chart';

export default function DWChart({ title, src, ...props }) {
  const iframeRef = useRef()
  const [height, setState] = useState(500)

  const onMessage = useCallback(
    ({ data = {}, source }) => {
      if (
        source !== iframeRef.current.contentWindow ||
        typeof data === 'string' ||
        !data['datawrapper-height']
      )
        return

      setState(Object.values(data['datawrapper-height'])[0])
    },
    [setState, iframeRef]
  )

  useEffect(() => {
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [height, setState, onMessage])

  return (
    <iframe
      ref={iframeRef}
      scrolling="no"
      frameBorder="0"
      width="100%"
      {...props}
      title={title}
      src={src}
      height={height}
    />
  )
}

export function Datawrapper({src}) {
  return (
    <DWChart src={src + (useColorMode().colorMode === "dark" ? '?dark=true' : '?dark=false')} />
  );
}

export function SemiBold({ children }) {
  return <span style={{ fontWeight: 500 }}>{children}</span>;
}

function localize(number) {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;
  if (locale == 'hu' && number > 1000 && number % 1000 == 0) {
    return (number / 1000).toLocaleString(locale);
  }
  return number.toLocaleString(locale);
}

export function BudgetBars({ 
    budgets = [], 
    payments = [], 
    unaffordable = false,                // if true, greys out the picture
    height = 200, 
    showBudgets = true, 
    showPayments = true, 
    showEffectiveVoteCounts = false,     // show effective vote counts below the budget bars
    showTotalEffectiveVoteCount = false, // show the sum of the effective vote counts to the right of the budget bars
    // effectiveVoteCounts = [],            // the effective vote counts to display
    overrideMax = null                   // default: the y-axis ranges from 0 to the maximum budget. This value can customize the upper limit (for example to use the initial maximum budget)
  }) {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;

  let absoluteHeight = 200 - 2; // account for the 1px border
  // decide on upper limit for the y-axis
  let maxBudget = Math.max(...budgets);
  if (overrideMax) {
    maxBudget = overrideMax;
  }
  // compute effective vote counts
  let effectiveVoteCounts = [];
  let totalEffectiveVoteCount = 0;
  if (showEffectiveVoteCounts) {
    let maxPayment = Math.max(...payments);
    for (let payment of payments) {
      let contribution = payment / maxPayment;
      effectiveVoteCounts.push(Math.round(100 * contribution) / 100);
      totalEffectiveVoteCount += contribution;
    }
    totalEffectiveVoteCount = Math.round(100 * totalEffectiveVoteCount) / 100;
  }
  // build budget bars
  let bars = budgets.map((budget, index) => {
    var barStyle = budget > 0 ? { height: absoluteHeight * budget/maxBudget + 'px' } : {};
    return (<div className="budget-bar-container" key={index.toString()}>
      {showBudgets && budget/maxBudget < 0.9 && budget/maxBudget > 0.05 && <div className="budget-bar-label">{localize(budget)}</div>}
      <Tippy content={<span>
          <Translate id="explanation.budgetBars.tooltipBudget" description="When hovering over a budget bar on the explanation page, a tooltip shows the voter's budget and spending. This is the label before the budget amount.">Budget:</Translate> <Currency>{budget.toLocaleString(locale)}</Currency>
          {showPayments && <span><br/><Translate id="explanation.budgetBars.tooltipSpending" description="When hovering over a budget bar on the explanation page, a tooltip shows the voter's budget and spending. This is the label before the spending amount.">Spending:</Translate> <Currency>{payments[index].toLocaleString(locale)}</Currency></span>} 
        </span>} theme="light">
        <div className={budget > 0 ? 'budget-bar' : 'budget-bar budget-bar-zero'} style={barStyle}>
          {showPayments && budget/maxBudget > 0.1  && <div className="payment-bar" style={{ height: absoluteHeight * payments[index]/maxBudget + 'px' }}>{localize(payments[index])}</div>}
        </div>
      </Tippy>
      {
        showEffectiveVoteCounts 
          ? (!isNaN(effectiveVoteCounts[index])
            ? <div className="vote-count">{localize(effectiveVoteCounts[index])}</div>
            : <div className="empty-vote-count"></div>)
          : null
      }
    </div>)
    }
  );
  return (
    <div 
      className={'budget-bars' + (unaffordable ? ' budget-bars-unaffordable' : '') + (showEffectiveVoteCounts ? ' budget-bars-with-vote-counts' : '') } 
      style={{ height: (height + (showEffectiveVoteCounts ? 24 : 0)) + 'px' }}>
      <div className="budget-bars-axis">
        <span><Currency>{maxBudget}</Currency></span>
        <div className="budget-bars-axis-line"></div>
        <span><Currency>{0}</Currency></span>
      </div>
      {bars}
      <div className="budget-bar-container">
      { showTotalEffectiveVoteCount && !isNaN(totalEffectiveVoteCount) && <div className="vote-count total-vote-count">{totalEffectiveVoteCount.toLocaleString(locale)}</div> }
      </div>
    </div>
  );
}

// for a particular alternative, spread its cost among voters, and return spending and rho
// function spreadCost(N, budgets, cost, u, approvers) {
//   let totalUtility = cost * sum(approvers.map(i => u[i]));
//   let availableMoney = sum(approvers.map(i => budgets[i]));
//   if (availableMoney < cost) {
//       return { affordable: false, availableMoney: availableMoney };
//   }
//   approvers.sort((i, j) => budgets[i] / u[i] - budgets[j] / u[j]);
//   let paid_so_far = 0;
//   let denominator = totalUtility;
//   for (let j = 0; j < approvers.length; j++) {
//       let rho = (cost - paid_so_far) / denominator;
//       if (rho * cost * u[approvers[j]] <= budgets[approvers[j]] + 0.0001) {
//           let result = { affordable: true, spending: {}, rho: rho };
//           // for (let i of N) {
//           //     result.spending[i] = 0;
//           // }
//           for (let i = 0; i < approvers.length; i++) {
//               result.spending[approvers[i]] = Math.min(rho * cost * u[approvers[i]], budgets[approvers[i]]);
//           }
//           return result;
//       }
//       paid_so_far += budgets[approvers[j]];
//       denominator -= u[approvers[j]] * cost;
//   }
// }
// too complicated don't need utilities

function sum(xs) {
  return xs.reduce((a, b) => a + b, 0);
}

function spreadCost(approvers, budgets, cost) {
  let totalBudget = sum(approvers.map(i => budgets[i]));
  if (totalBudget < cost) {
      return { affordable: false };
  }
  approvers.sort((i, j) => budgets[i] - budgets[j]);
  let paid_so_far = 0;
  let spending = {};
  for (let j = 0; j < approvers.length; j++) {
    if ((cost - paid_so_far) / (approvers.length - j) <= budgets[approvers[j]]) {
      for (let k = j; k < approvers.length; k++) {
        spending[approvers[k]] = (cost - paid_so_far) / (approvers.length - j);
      }
      return { affordable: true, spending: spending };
    }
    spending[approvers[j]] = budgets[approvers[j]];
    paid_so_far += budgets[approvers[j]];
    totalBudget -= budgets[approvers[j]];
  }
  return { affordable: false };
}

export function WaterFilling ({showEffectiveVoteCounts = false}) {
  const [cost, setCost] = useState(30);

  const budgets = [10, 10, 10, 20, 30];

  
  let approvers = [0, 1, 2, 3, 4];
  let spread = spreadCost(approvers, budgets, cost);
  let payments = approvers.map(i => 0);
  if (spread.affordable) {
    payments = approvers.map(i => spread.spending[i]);
  }
  
  function handleClick(e) {
    setCost(e.target.value);
  }
  return (
    <div>
      <BudgetBars budgets={budgets} payments={payments} unaffordable={!spread.affordable} showEffectiveVoteCounts={showEffectiveVoteCounts} showTotalEffectiveVoteCount={showEffectiveVoteCounts} />
      {spread.affordable ? <span><Translate>Cost:</Translate> <Currency>{cost}</Currency></span> : <span><s><Translate>Cost:</Translate> <Currency>{cost}</Currency></s> <Translate>(supporting voters do not have enough money)</Translate></span>} <br/>
      <input onInput={handleClick} type="range" min="0" max="100" value={cost} step="5" style={{width:"20em"}} />
    </div>
  );
}