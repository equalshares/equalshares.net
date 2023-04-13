import React from "react";
import { useState, useEffect } from "react";
import Translate, { translate } from '@docusaurus/Translate';
import useIsBrowser from '@docusaurus/useIsBrowser';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Rating } from 'react-simple-star-rating'

import { Currency } from '@site/src/components/CurrencyChoice';
import { BudgetBars } from '@site/src/components/MyComponents';

import styles from './index.module.css';

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

import { calculateRule } from './EqualShares.js';

function sum(xs) {
  return xs.reduce((a, b) => a + b, 0);
}

const useLocalStorage = (storageKey, fallbackState) => {
  const isBrowser = useIsBrowser();

  const [value, setValue] = React.useState(
    isBrowser ? (JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState) : fallbackState
  );

  React.useEffect(() => {
    if (isBrowser) { 
      localStorage.setItem(storageKey, JSON.stringify(value)); 
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, [value, storageKey]);

  return [value, setValue];
};

const projectNames = [
  (<span className="project-1">🚲 bike path</span>),
  (<span className="project-2">🏋️ public gym</span>),
  (<span className="project-3">🌳 new park</span>),
  (<span className="project-4">🛝 playground</span>),
  (<span className="project-5">📚 kids library</span>),
  (<span className="project-6">🚒 fire station</span>),
  (<span className="project-7">🥁 festival</span>),
  (<span className="project-8">🌎 free courses</span>),
  (<span className="project-9">🖼️ free museum</span>),
  (<span className="project-10">🦽 accessibility</span>),
  (<span className="project-11">🏓 ping pong</span>),
  (<span className="project-12">🪑 benches</span>),
];

function UtilityInput({ settings, utility, setUtility, totalUtilityOfVoter }) {
  const [isDisabled, setIsDisabled] = useState(false);

  if (settings.input == 'range') {
    const handleRating = (rating) => {
      console.log(rating, utility, rating === utility);
      if (rating === utility) {
        setUtility(0);
        // disable for 0.5 seconds
        setIsDisabled(true);
        setTimeout(() => setIsDisabled(false), 500);
        console.log('reset');
      } else {
        setUtility(rating);
      }
    };
    return (
      <div>
        <Rating 
          key={utility}
          size={22}
          style={{lineHeight: '18px'}}
          initialValue={utility}
          onClick={handleRating}
          readonly={isDisabled}
          />
      </div>
    );
  } else if (settings.input == 'approval') {
    const handleApproval = (e) => {
      setUtility(e.target.checked ? 1 : 0);
    };
    return (
      <div>
        <input
          type="checkbox"
          checked={utility > 0}
          onChange={handleApproval}
          className={styles.approvalInput}
        />
      </div>
    );
  }
}

function CostInput({ cost, setCost }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleCostChange = (e) => {
    // replace by floor
    e.target.value = Math.floor(e.target.value);
    setCost(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="number"
          value={cost}
          onChange={handleCostChange}
          onBlur={handleBlur}
          className={styles.costInput}
          autoFocus
        />
      ) : (
        <span onClick={handleClick} className={styles.costInputLabel}><Currency>{cost}</Currency></span>
      )}
    </div>
  );
}


function ProfileInput({ instance, settings, setInstance }) {
  return (
    <div className={styles.profileInput}>
      <table>
        <thead>
          <tr>
            <th></th>
            {
              instance.N.map((i) => (
                <th key={i}>
                  Voter {i + 1}
                </th>
              ))
            }
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {
            instance.C.map((j) => (
              <tr key={j}>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {projectNames[j]}
                </td>
                {
                  instance.N.map((i) => (
                    <td key={i}>
                      <UtilityInput
                        settings={settings}
                        utility={instance.u[j][i]}
                        totalUtilityOfVoter={sum(instance.C.map((j) => instance.u[j][i]))}
                        setUtility={(utility) => {
                          let newU = { ...instance.u };
                          newU[j][i] = utility;
                          setInstance({ ...instance, u: newU });
                        }}
                      />
                    </td>
                  ))
                }
                <td key={j}>
                  <CostInput cost={instance.cost[j]} setCost={(cost) => { setInstance({ ...instance, cost: { ...instance.cost, [j]: cost } }); }} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

function ProjectStatus({ budgets, spending }) {
  if (!spending) {
    return (<></>);
  }
  // console.log(Object.values(budgets));
  // console.log(Object.values(spending));
  return (<BudgetBars budgets={budgets} payments={spending} />);
}

function ComputationResults({ rounds=[] }) {
  return (
    <div className={styles.profileInput}>
      {
        rounds.map((round, i) => (
              <div key={i}>
                <h3>Round {i+1} ({round.type}): select {round.selected != null ? projectNames[round.selected] : ''}.</h3>
                {
                  round.remaining.map((project, j) =>(
                      <span key={j}>
                        <span>
                          {projectNames[project]}
                        </span>
                        { round.type == 'project-selected' &&
                          (<ProjectStatus budgets={round.budgets} spending={round.costDistribution[project].spending} />)
                        }
                      </span>
                    ))
                }
              </div>
            )
        )
      }
    </div>
  );
}

// function Loader({ url, setInstance }) {
//   const [alreadyQueried, setAlreadyQueried] = useState(false);
//   React.useEffect(() => {
//     if (!alreadyQueried && url.includes('?')) {
//       fetch('https://api.npms.io/v2/search?q=react')
//         .then(response => response.json())
//         .then(data => console.log(data));
//       setAlreadyQueried(true);
//     } else if (!alreadyQueried) {
//       let storage = JSON.parse(localStorage.getItem('PlayAppInstance'));
//       if (storage) {
//         setInstance(storage);
//         setAlreadyQueried(true);
//       }
//     }
//     return (<span>{url}</span>);
//   }, [url, alreadyQueried, setInstance]);
//   return <></>;
// }

export function PlayApp() {
  let startingInstance = {
    N: [...Array(7).keys()],
    C: [...Array(5).keys()],
    budget: 700,
    cost: { 0: 700, 1: 400, 2: 250, 3: 200, 4: 100, 5: 10, 6: 10, 7: 10, 8: 10, 9: 10, 10: 10, 11: 10 },
  };
  let u = {};
  for (let j of startingInstance.C) {
    u[j] = {};
    for (let i of startingInstance.N) {
      u[j][i] = 0;
    }
  }
  startingInstance.u = u;

  const startingSettings = {
    input: "range"
  };

  const [instance, setInstance] = useLocalStorage('PlayAppInstance3', startingInstance);
  // const [instance, setInstance] = useState(startingInstance);
  const [settings, setSettings] = useState(startingSettings);

  // let rounds = [];
  const [rounds, setRounds] = useState(calculateRule(instance.N, instance.C, instance.cost, instance.budget, instance.u));

  function updateInstance(newInstance) {
    setRounds(calculateRule(newInstance.N, newInstance.C, newInstance.cost, newInstance.budget, newInstance.u));
    setInstance(newInstance);
  }

  function handleClick(e) {
    return false;
  }
  return (
    <div>
      {/* <BrowserOnly>
        {() => <Loader url={window.location.search} setInstance={updateInstance} /> }
      </BrowserOnly> */}
      <p>todo: Random. Reset button with undo. Share. Export .pb file.</p>
      <p>Budget: <CostInput cost={instance.budget} setCost={
        (budget) => {
          updateInstance({ ...instance, budget: budget });
        }
      } /></p>
      <ProfileInput instance={instance} settings={settings} setInstance={updateInstance} />
      <ComputationResults rounds={rounds} />
    </div>
  );
}