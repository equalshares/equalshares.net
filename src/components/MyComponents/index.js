import React from "react";
import { useState } from "react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

import DWChart from 'react-datawrapper-chart';
import { useColorMode } from '@docusaurus/theme-common';

export function Datawrapper({src}) {
  const { isDarkTheme } = useColorMode();
  return (
    <DWChart src={src + (isDarkTheme ? '?dark=true' : '')} />
  );
}

export function CurrencySymbol() {
  const { siteConfig } = useDocusaurusContext();
  const currencySymbol = siteConfig.customFields.currencySymbol;
  return (
    <span>{currencySymbol}</span>
  );
}

export function SemiBold({ children }) {
  return <span style={{ fontWeight: 500 }}>{children}</span>;
}

export function BudgetBars({ budgets, payments = [], unaffordable = false, height = '200px', showBudgets = true, showPayments = true, overrideMax = null }) {
  let maxBudget = Math.max(...budgets);
  if (overrideMax) {
    maxBudget = overrideMax;
  }
  let bars = budgets.map((budget, index) => {
    var barStyle = budget > 0 ? { height: 100 * budget/maxBudget + '%' } : {}; // make a larger hoverable area for height-0 bars
    return (<div className="budget-bar-container" key={index.toString()}>
      {showBudgets && budget/maxBudget < 0.9 && budget/maxBudget > 0.05 && <div className="budget-bar-label">{budget}</div>}
      <Tippy content={<span>
          Budget: <CurrencySymbol/>{budget} 
          {showPayments && <span><br/>Spending: <CurrencySymbol/>{payments[index]}</span>} 
        </span>} theme="light">
        <div className={budget > 0 ? 'budget-bar' : 'budget-bar budget-bar-zero'} style={barStyle}>
          {showPayments && budget/maxBudget > 0.1  && <div className="payment-bar" style={{ height: 100 * payments[index]/budget + '%' }}>{payments[index]}</div>}
        </div>
      </Tippy>
    </div>)
    }
  );
  return (
    <div className={'budget-bars' + (unaffordable ? ' budget-bars-unaffordable' : '') } style={{ height: height }}>
      <div className="budget-bars-axis">
        <span><CurrencySymbol/>{maxBudget}</span>
        <div className="budget-bars-axis-line"></div>
        <span><CurrencySymbol/>{0}</span>
      </div>
      {bars}
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

export function WaterFilling () {
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
      <BudgetBars budgets={budgets} payments={payments} unaffordable={!spread.affordable} />
      {spread.affordable ? <span>Cost: <CurrencySymbol/>{cost}</span> : <span><s>Cost: <CurrencySymbol/>{cost}</s> (supporting voters do not have enough money)</span>} <br/>
      <input onInput={handleClick} type="range" min="0" max="100" value={cost} step="5" style={{width:"20em"}} />
    </div>
  );
}