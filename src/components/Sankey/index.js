import React from "react";
import { useState, useEffect, useContext } from 'react'

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import styles from './index.module.css';

import { Currency, CurrencyString, CurrencyContext } from '@site/src/components/CurrencyChoice';

import Translate, {translate} from '@docusaurus/Translate';

function TooltippedVoter({name, contributions, children}) {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Tippy delay={[50,50]} content={<div>
            <b><Translate id="sankey.voterLabel.prefix">Voter</Translate> {name}</b> &middot; <Translate id="sankey.tooltipBudgetShare" description="used in tooltips of voters in the Sankey diagram to say 'Budget share: [amount]'">Budget share</Translate>: <Currency>150</Currency>
            <ul className={styles.tooltipBallotList}>
                <li className={'1' in contributions ? styles.selected : ''}><Translate id="sankey.projectLabel.prefix">Project</Translate> 1 {'1' in contributions ? <Translate id="sankey.tooltipContributesAmount" description="used in tooltips of voters in the Sankey diagram to say that a voter contributes amount to a project" values={{ amount: (<Currency>{contributions[1]}</Currency>) }}>{'(contributes {amount})'}</Translate> : '' }</li>
                <li className={'2' in contributions ? styles.selected : ''}><Translate id="sankey.projectLabel.prefix">Project</Translate> 2 {'2' in contributions ? <Translate id="sankey.tooltipContributesAmount" description="used in tooltips of voters in the Sankey diagram to say that a voter contributes amount to a project" values={{ amount: (<Currency>{contributions[2]}</Currency>) }}>{'(contributes {amount})'}</Translate> : '' }</li>
                <li className={'3' in contributions ? styles.selected : ''}><Translate id="sankey.projectLabel.prefix">Project</Translate> 3 {'3' in contributions ? <Translate id="sankey.tooltipContributesAmount" description="used in tooltips of voters in the Sankey diagram to say that a voter contributes amount to a project" values={{ amount: (<Currency>{contributions[3]}</Currency>) }}>{'(contributes {amount})'}</Translate> : '' }</li>
                <li className={'4' in contributions ? styles.selected : ''}><Translate id="sankey.projectLabel.prefix">Project</Translate> 4 {'4' in contributions ? <Translate id="sankey.tooltipContributesAmount" description="used in tooltips of voters in the Sankey diagram to say that a voter contributes amount to a project" values={{ amount: (<Currency>{contributions[4]}</Currency>) }}>{'(contributes {amount})'}</Translate> : '' }</li>
            </ul>
        </div>} theme='light' animation='none' duration={[300,0]}>
            {children}
        </Tippy>
    );
}

function Sankey() {
  const { siteConfig } = useDocusaurusContext();
  const { currency, setCurrency } = useContext(CurrencyContext);
  const currencySymbol = currency;

  const [viewport, setViewport] = useState('large');

  const handleResize = () => {
      if (window.innerWidth > 700) {
          setViewport('large');
      } else {
          setViewport('small');
      }
  };

  useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
          window.removeEventListener('resize', handleResize);
      }
  })

  if (viewport === 'large') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="1400" height="770" viewBox="0 0 1400 770">
        <defs>
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0081cc"/>
        <stop offset="50%" stopColor="#0089d9"/>
        <stop offset="100%" stopColor="#0096ed"/>
        </linearGradient>
        </defs>
        <g transform="translate(72.542 38)">
          <g fill="none" stroke="url(#linear)">
            <path
              strokeWidth="68.76"
              d="M15 115.34c177.15 0 413.35-56.672 590.5-56.672"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="68.76"
              d="M15 184.1c177.15 0 413.35-40.48 590.5-40.48"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="68.76"
              d="M15 252.86c177.15 0 413.35-24.288 590.5-24.288"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="68.76"
              d="M15 321.62c177.15 0 413.35-8.096 590.5-8.096"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="68.76"
              d="M15 390.38c177.15 0 413.35 8.096 590.5 8.096"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="68.76"
              d="M15 459.14c177.15 0 413.35 24.288 590.5 24.288"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="68.76"
              d="M15 527.9c177.15 0 413.35 40.48 590.5 40.48"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="68.76"
              d="M15 596.66c177.15 0 413.35 56.672 590.5 56.672"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="45.84"
              d="M620.5 47.208c177.15 0 413.351 41.83 590.501 41.83"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="45.84"
              d="M620.5 132.16c177.15 0 413.351 2.717 590.501 2.717"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="45.84"
              d="M620.5 217.112c177.15 0 413.351-36.395 590.501-36.395"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="45.84"
              d="M620.5 302.064c177.15 0 413.351-75.507 590.501-75.507"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="45.84"
              d="M620.5 387.016c177.15 0 413.351-114.619 590.501-114.619"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="45.84"
              d="M620.5 471.968c177.15 0 413.351-153.73 590.501-153.73"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="22.92"
              d="M620.5 81.588c177.15 0 413.351 287.221 590.501 287.221"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="22.92"
              d="M620.5 166.54c177.15 0 413.351 225.19 590.501 225.19"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="22.92"
              d="M620.5 251.492c177.15 0 413.351 163.157 590.501 163.157"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="22.92"
              d="M620.5 336.444c177.15 0 413.351 163.157 590.501 163.157"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="22.92"
              d="M620.5 421.396c177.15 0 413.351 101.125 590.501 101.125"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="22.92"
              d="M620.5 506.348c177.15 0 413.351 101.125 590.501 101.125"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="22.92"
              d="M620.5 591.3c177.15 0 413.351 39.093 590.501 39.093"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="22.92"
              d="M620.5 568.38c177.15 0 413.351-22.939 590.501-22.939"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="22.92"
              d="M620.5 545.46c177.15 0 413.351-107.89 590.501-107.89"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="22.92"
              d="M620.5 676.252c177.15 0 413.351-22.939 590.501-22.939"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="22.92"
              d="M620.5 653.332c177.15 0 413.351-84.97 590.501-84.97"
              opacity="0.45"
            ></path>
            <path
              strokeWidth="22.92"
              d="M620.5 630.412c177.15 0 413.351-169.923 590.501-169.923"
              opacity="0.45"
            ></path>
          </g>
          <g>
            <g className="node">
              <path
                  fill="#0081cc"
                  fillOpacity="1"
                  d="M605.501 24.288H620.501V93.048H605.501z"
                  className="voter1 for_r0"
                  ></path>
              <TooltippedVoter name="1" contributions={{1: 100, 2: 50}}>
                  <path
                  fillOpacity={0}  
                  d="M535 24.288H620.501V93.048H535z"
                  ></path>
              </TooltippedVoter>
            </g>
            <g className="node">
              <path
                fill="#0081cc"
                fillOpacity="1"
                d="M605.501 109.24H620.501V178H605.501z"
                className="voter2 for_r3"
              ></path>
              <TooltippedVoter name="2" contributions={{1: 100, 2: 50}}>
                  <path
                  fillOpacity={0}  
                  d="M535 109.24H620.501V178H535z"
                  ></path>
              </TooltippedVoter>
            </g>
            <g className="node">
              <path
                fill="#0081cc"
                fillOpacity="1"
                d="M605.501 194.192H620.501V262.952H605.501z"
                className="voter3 for_r4"
              ></path>
              <TooltippedVoter name="3" contributions={{1: 100, 2: 50}}>
                  <path
                  fillOpacity={0}  
                  d="M535 194.192H620.501V262.952H535z"
                  ></path>
              </TooltippedVoter>
            </g>
            <g className="node">
              <path
                fill="#0081cc"
                fillOpacity="1"
                d="M605.501 279.144H620.501V347.904H605.501z"
                className="voter4 for_r5"
              ></path>
              <TooltippedVoter name="4" contributions={{1: 100, 3: 50}}>
                  <path
                  fillOpacity={0}  
                  d="M535 279.144H620.501V347.904H535z"
                  ></path>
              </TooltippedVoter>
            </g>
            <g className="node">
              <path
                fill="#0081cc"
                fillOpacity="1"
                d="M605.501 364.096H620.501V432.856H605.501z"
                className="voter5 for_r7"
              ></path>
              <TooltippedVoter name="5" contributions={{1: 100, 3: 50}}>
                  <path
                  fillOpacity={0}  
                  d="M535 364.096H620.501V432.856H535z"
                  ></path>
              </TooltippedVoter>
            </g>
            <g className="node">
              <path
                fill="#0081cc"
                fillOpacity="1"
                d="M605.501 449.048H620.501V517.808H605.501z"
                className="voter6 for_r8"
              ></path>
              <TooltippedVoter name="6" contributions={{1: 100, 4: 50}}>
                  <path
                  fillOpacity={0}  
                  d="M535 449.048H620.501V517.808H535z"
                  ></path>
              </TooltippedVoter>
            </g>
            <g className="node">
              <path
                fill="#0081cc"
                fillOpacity="1"
                d="M605.501 534H620.501V602.76H605.501z"
                className="voter7 for_r10"
              ></path>
              <TooltippedVoter name="7" contributions={{2: 50, 3: 50, 4: 50}}>
                  <path
                  fillOpacity={0}  
                  d="M535 534H620.501V602.76H535z"
                  ></path>
              </TooltippedVoter>
            </g>
            <g className="node">
              <path
                fill="#0081cc"
                fillOpacity="1"
                d="M605.501 618.952H620.501V687.712H605.501z"
                className="voter8 for_r11"
              ></path>
              <TooltippedVoter name="8" contributions={{2: 50, 3: 50, 4: 50}}>
                  <path
                  fillOpacity={0}  
                  d="M535.501 618.952H620.501V687.712H535.501z"
                  ></path>
              </TooltippedVoter>
            </g>


            <g className="node">
              <path
                fill="#0081cc"
                fillOpacity="1"
                d="M1211.001 66.117H1226.001V341.15700000000004H1211.001z"
                className="for_r1"
              ></path>
              <Tippy content={<Translate id="sankey.projectTooltip" description="The tooltip appearing when hovering over a project on the right" values={{
                projectNumber: '1',
                projectCost: (<b><Currency>600</Currency></b>),
                numVoters: (<b>6</b>),
                contributionAmount: (<Currency>100</Currency>),
              }}>
                  {'Project {projectNumber} costs {projectCost}. This cost is covered equally by the {numVoters} voters who voted for Project {projectNumber}. Each of these voters contribute {contributionAmount} from their budget share.'}
              </Translate>} placement="left" theme="light">
                  <path
                  fillOpacity="0"
                  d="M1180.001 66.117H1326.001V341.15700000000004H1180.001z"
                  className="for_r1"
                  ></path>
              </Tippy>
            </g>
            <g className="node">
              <path
                fill="#0081cc"
                fillOpacity="1"
                d="M1211.001 357.349H1226.001V471.94899999999996H1211.001z"
                className="for_r2"
              ></path>
              <Tippy content={<Translate id="sankey.projectTooltip" description="The tooltip appearing when hovering over a project on the right" values={{
                projectNumber: '2',
                projectCost: (<b><Currency>250</Currency></b>),
                numVoters: (<b>5</b>),
                contributionAmount: (<Currency>50</Currency>),
              }}>
                  {'Project {projectNumber} costs {projectCost}. This cost is covered equally by the {numVoters} voters who voted for Project {projectNumber}. Each of these voters contribute {contributionAmount} from their budget share.'}
              </Translate>} placement="left" theme="light">
                  <path
                  fillOpacity="0"
                  d="M1180.001 357.349H1326.001V471.94896H1180.001z"
                  className="for_r1"
                  ></path>
              </Tippy>
            </g>
            <g className="node">
              <path
                fill="#0081cc"
                fillOpacity="1"
                d="M1211.001 488.141H1226.001V579.821H1211.001z"
                className="for_r6"
              ></path>
              <Tippy content={<Translate id="sankey.projectTooltip" description="The tooltip appearing when hovering over a project on the right" values={{
                projectNumber: '3',
                projectCost: (<b><Currency>200</Currency></b>),
                numVoters: (<b>4</b>),
                contributionAmount: (<Currency>50</Currency>),
              }}>
                  {'Project {projectNumber} costs {projectCost}. This cost is covered equally by the {numVoters} voters who voted for Project {projectNumber}. Each of these voters contribute {contributionAmount} from their budget share.'}
              </Translate>} placement="left" theme="light">
                  <path
                  fillOpacity="0"
                  d="M1180.001 488.141H1326.001V579.821H1180.001z"
                  className="for_r1"
                  ></path>
              </Tippy>
            </g>
            <g className="node">
              <path
                fill="#0081cc"
                fillOpacity="1"
                d="M1211.001 596.013H1226.001V664.773H1211.001z"
                className="for_r9"
              ></path>
              <Tippy content={<Translate id="sankey.projectTooltip" description="The tooltip appearing when hovering over a project on the right" values={{
                projectNumber: '4',
                projectCost: (<b><Currency>150</Currency></b>),
                numVoters: (<b>3</b>),
                contributionAmount: (<Currency>50</Currency>),
              }}>
                  {'Project {projectNumber} costs {projectCost}. This cost is covered equally by the {numVoters} voters who voted for Project {projectNumber}. Each of these voters contribute {contributionAmount} from their budget share.'}
              </Translate>} placement="left" theme="light">
                  <path
                  fillOpacity="0"
                  d="M1180.001 596.013H1326.001V664.773H1180.001z"
                  className="for_r1"
                  ></path>
              </Tippy>
            </g>

            <g className="node city">
              <path
                fill="#0081cc"
                fillOpacity="1"
                d="M0 80.96H15V631.0400000000001H0z"
                className="for_r12"
              ></path>
              <Tippy content={<Translate id="sankey.cityTooltip" values={{
                cityBudget: (<b><Currency>1200</Currency></b>),
                voterBudget: (<b><Currency>150</Currency></b>),
              }}>
                  {'The city budget is {cityBudget}. It is divided equally between the 8 voters, so each voter gets {voterBudget}.'}
              </Translate>} placement="right" theme="light">
                  <path
                  fillOpacity="0"
                  d="M-60 80.96H50V631.0400000000001H-60z"
                  className="for_r12"
                  ></path>
              </Tippy>
            </g>
          </g>
          <g fill="#000" fontFamily="Roboto,sans-serif" fontSize="20" fontWeight="400" style={{ pointerEvents: "none" }}>
            <g style={{ textShadow: "0 0 3px white, 0 0 1px white" }}>
              <text
                  x="598.381"
                  y="58.668"
                  className="for_r0"
                  dy="-8"
                  fontWeight="500"
                  textAnchor="end"
              >
                  <Translate id="sankey.voterLabel.prefix">Voter</Translate> 1
              </text>
              <text
                  x="598.381"
                  y="58.668"
                  className="for_r0"
                  dy="20"
                  textAnchor="end"
              >
                  <CurrencyString amount="150"/>
              </text>
              <text
                  x="598.381"
                  y="143.62"
                  className="for_r3"
                  dy="-8"
                  fontWeight="500"
                  textAnchor="end"
              >
                  <Translate id="sankey.voterLabel.prefix">Voter</Translate> 2
              </text>
              <text
                  x="598.381"
                  y="143.62"
                  className="for_r3"
                  dy="20"
                  textAnchor="end"
              >
                  <CurrencyString amount="150"/>
              </text>
              <text
                  x="598.381"
                  y="228.572"
                  className="for_r4"
                  dy="-8"
                  fontWeight="500"
                  textAnchor="end"
              >
                  <Translate id="sankey.voterLabel.prefix">Voter</Translate> 3
              </text>
              <text
                  x="598.381"
                  y="228.572"
                  className="for_r4"
                  dy="20"
                  textAnchor="end"
              >
                  <CurrencyString amount="150"/>
              </text>
              <text
                  x="598.381"
                  y="313.524"
                  className="for_r5"
                  dy="-8"
                  fontWeight="500"
                  textAnchor="end"
              >
                  <Translate id="sankey.voterLabel.prefix">Voter</Translate> 4
              </text>
              <text
                  x="598.381"
                  y="313.524"
                  className="for_r5"
                  dy="20"
                  textAnchor="end"
              >
                  <CurrencyString amount="150"/>
              </text>
              <text
                  x="598.381"
                  y="398.476"
                  className="for_r7"
                  dy="-8"
                  fontWeight="500"
                  textAnchor="end"
              >
                  <Translate id="sankey.voterLabel.prefix">Voter</Translate> 5
              </text>
              <text
                  x="598.381"
                  y="398.476"
                  className="for_r7"
                  dy="20"
                  textAnchor="end"
              >
                  <CurrencyString amount="150"/>
              </text>
              <text
                  x="598.381"
                  y="483.428"
                  className="for_r8"
                  dy="-8"
                  fontWeight="500"
                  textAnchor="end"
              >
                  <Translate id="sankey.voterLabel.prefix">Voter</Translate> 6
              </text>
              <text
                  x="598.381"
                  y="483.428"
                  className="for_r8"
                  dy="20"
                  textAnchor="end"
              >
                  <CurrencyString amount="150"/>
              </text>
              <text
                  x="598.381"
                  y="568.38"
                  className="for_r10"
                  dy="-8"
                  fontWeight="500"
                  textAnchor="end"
              >
                  <Translate id="sankey.voterLabel.prefix">Voter</Translate> 7
              </text>
              <text
                  x="598.381"
                  y="568.38"
                  className="for_r10"
                  dy="20"
                  textAnchor="end"
              >
                  <CurrencyString amount="150"/>
              </text>
              <text
                  x="598.381"
                  y="653.332"
                  className="for_r11"
                  dy="-8"
                  fontWeight="500"
                  textAnchor="end"
              >
                  <Translate id="sankey.voterLabel.prefix" description="The word 'Voter' that will be used in 'Voter 1', 'Voter 2', etc.">Voter</Translate> 8
              </text>
              <text
                  x="598.381"
                  y="653.332"
                  className="for_r11"
                  dy="20"
                  textAnchor="end"
              >
                  <CurrencyString amount="150"/>
              </text>
            </g>


            <text
              x="-10.12"
              y="356"
              className="for_r12"
              dy="-8"
              fontWeight="500"
              textAnchor="end"
            >
              <Translate id="sankey.cityLabel" description="Label for the City on the left of the Sankey figure">City</Translate>
            </text>
            <text
              x="-10.12"
              y="356"
              className="for_r12"
              dy="20"
              textAnchor="end"
            >
              <CurrencyString amount="1200"/>
            </text>


            <text
              x="1235.121"
              y="203.637"
              className="for_r1"
              dy="-8"
              fontWeight="500"
              textAnchor="start"
            >
              <Translate id="sankey.projectLabel.prefix">Project</Translate> 1
            </text>
            <text
              x="1235.121"
              y="203.637"
              className="for_r1"
              dy="20"
              textAnchor="start"
            >
              <CurrencyString amount="600"/>
            </text>
            <text
              x="1235.121"
              y="414.649"
              className="for_r2"
              dy="-8"
              fontWeight="500"
              textAnchor="start"
            >
              <Translate id="sankey.projectLabel.prefix">Project</Translate> 2
            </text>
            <text
              x="1235.121"
              y="414.649"
              className="for_r2"
              dy="20"
              textAnchor="start"
            >
              <CurrencyString amount="250"/>
            </text>
            <text
              x="1235.121"
              y="533.981"
              className="for_r6"
              dy="-8"
              fontWeight="500"
              textAnchor="start"
            >
              <Translate id="sankey.projectLabel.prefix">Project</Translate> 3
            </text>
            <text
              x="1235.121"
              y="533.981"
              className="for_r6"
              dy="20"
              textAnchor="start"
            >
              <CurrencyString amount="200"/>
            </text>
            <text
              x="1235.121"
              y="630.393"
              className="for_r9"
              dy="-8"
              fontWeight="500"
              textAnchor="start"
            >
              <Translate id="sankey.projectLabel.prefix" description="The word 'Project' that will be used in 'Project 1', 'Project 2', etc.">Project</Translate> 4
            </text>
            <text
              x="1235.121"
              y="630.393"
              className="for_r9"
              dy="20"
              textAnchor="start"
            >
              <CurrencyString amount="150"/>
            </text>
          </g>
          <g fill="#000" fontFamily="Roboto,sans-serif" fontSize="24" fontWeight="400">
              <text x="0" y="-20" fontWeight="500" textAnchor="start">
                <Translate id="sankey.projectLabel.leftTextLine1">Step 1: The budget is divided equally</Translate>
              </text>
              <text x="0" y="-20" dy="29" fontWeight="500" textAnchor="start">
                <Translate id="sankey.projectLabel.leftTextLine2">among the voters</Translate>
              </text>
              <text x="1226" y="-20" fontWeight="500" textAnchor="end">
                  <Translate id="sankey.projectLabel.rightTextLine1">Step 2: Projects are funded with the shares</Translate>
              </text>
              <text x="1226" y="-20" dy="29" fontWeight="500" textAnchor="end">
                <Translate id="sankey.projectLabel.rightTextLine2">of those who voted for them</Translate>
              </text>
          </g>
        </g>
      </svg>
    );
    } else { // viewport == small
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 694.1 1369.2"
          version="1.1"
          viewBox="0 0 694.1 1369.2"
        >
          <path
            d="M104.8 82.9c0 177.1-56.7 413.4-56.7 590.5M173.5 82.9c0 177.1-40.5 413.4-40.5 590.5M242.3 82.9c0 177.1-24.3 413.4-24.3 590.5M311 82.9c0 177.1-8.1 413.4-8.1 590.5M379.8 82.9c0 177.1 8.1 413.4 8.1 590.5M448.6 82.9c0 177.1 24.3 413.4 24.3 590.5M517.3 82.9c0 177.1 40.5 413.4 40.5 590.5M586.1 82.9c0 177.1 56.7 413.4 56.7 590.5"
            className="st0"
          ></path>
          <path
            d="M36.6 688.4c0 177.2 41.8 413.4 41.8 590.5M121.6 688.4c0 177.2 2.7 413.4 2.7 590.5M206.5 688.4c0 177.2-36.4 413.4-36.4 590.5M291.5 688.4c0 177.2-75.5 413.4-75.5 590.5M376.4 688.4c0 177.2-114.6 413.4-114.6 590.5M461.4 688.4c0 177.2-153.7 413.4-153.7 590.5"
            className="st1"
          ></path>
          <path
            d="M71 688.4c0 177.2 287.2 413.4 287.2 590.5M156 688.4c0 177.2 225.2 413.4 225.2 590.5M240.9 688.4c0 177.2 163.2 413.4 163.2 590.5M325.9 688.4c0 177.2 163.2 413.4 163.2 590.5M410.8 688.4c0 177.2 101.1 413.4 101.1 590.5M495.8 688.4c0 177.2 101.1 413.4 101.1 590.5M580.7 688.4c0 177.2 39.1 413.4 39.1 590.5M557.8 688.4c0 177.2-22.9 413.4-22.9 590.5M534.9 688.4c0 177.2-107.9 413.4-107.9 590.5M665.7 688.4c0 177.2-22.9 413.4-22.9 590.5M642.7 688.4c0 177.2-85 413.4-85 590.5M619.8 688.4c0 177.2-169.9 413.4-169.9 590.5"
            className="st2"
          ></path>
          <path d="M13.7 673.4v15h68.8v-15H13.7z" className="st3"></path>
          <TooltippedVoter name="1" contributions={{1: 100, 2: 50}}>
            <path d="M13.7 602.9v85.5h68.8v-85.5H13.7z" className="st4"></path>
          </TooltippedVoter>
          <path d="M98.7 673.4v15h68.8v-15H98.7z" className="st3"></path>
          <TooltippedVoter name="2" contributions={{1: 100, 2: 50}}>
            <path d="M98.7 602.9v85.5h68.8v-85.5H98.7z" className="st4"></path>
          </TooltippedVoter>
          <path d="M183.6 673.4v15h68.8v-15h-68.8z" className="st3"></path>
          <TooltippedVoter name="3" contributions={{1: 100, 2: 50}}>
            <path d="M183.6 602.9v85.5h68.8v-85.5h-68.8z" className="st4"></path>
          </TooltippedVoter>
          <path d="M268.6 673.4v15h68.8v-15h-68.8z" className="st3"></path>
          <TooltippedVoter name="4" contributions={{1: 100, 3: 50}}>
            <path d="M268.6 602.9v85.5h68.8v-85.5h-68.8z" className="st4"></path>
          </TooltippedVoter>
          <path d="M353.5 673.4v15h68.8v-15h-68.8z" className="st3"></path>
          <TooltippedVoter name="5" contributions={{1: 100, 3: 50}}>
            <path d="M353.5 602.9v85.5h68.8v-85.5h-68.8z" className="st4"></path>
          </TooltippedVoter>
          <path d="M438.5 673.4v15h68.8v-15h-68.8z" className="st3"></path>
          <TooltippedVoter name="6" contributions={{1: 100, 4: 50}}>
            <path d="M438.5 602.9v85.5h68.8v-85.5h-68.8z" className="st4"></path>
          </TooltippedVoter>
          <path d="M523.4 673.4v15h68.8v-15h-68.8z" className="st3"></path>
          <TooltippedVoter name="7" contributions={{2: 50, 3: 50, 4: 50}}>
            <path d="M523.4 602.9v85.5h68.8v-85.5h-68.8z" className="st4"></path>
          </TooltippedVoter>
          <path d="M608.4 673.4v15h68.8v-15h-68.8z" className="st3"></path>
          <TooltippedVoter name="8" contributions={{2: 50, 3: 50, 4: 50}}>
            <path d="M608.4 603.4v85h68.8v-85h-68.8z" className="st4"></path>
          </TooltippedVoter>
          <g>
            <path d="M55.5 1278.9v15h275v-15h-275z" className="st3"></path>
            <Tippy content={<Translate id="sankey.projectTooltip" description="The tooltip appearing when hovering over a project on the right" values={{
                projectNumber: '1',
                projectCost: (<b><Currency>600</Currency></b>),
                numVoters: (<b>6</b>),
                contributionAmount: (<Currency>100</Currency>),
              }}>
                  {'Project {projectNumber} costs {projectCost}. This cost is covered equally by the {numVoters} voters who voted for Project {projectNumber}. Each of these voters contribute {contributionAmount} from their budget share.'}
              </Translate>} placement="top" theme="light">
            <path d="M55.5 1247.9v146h275v-146h-275z" className="st4"></path>
            </Tippy>
          </g>
          <g>
            <path d="M346.8 1278.9v15h114.6v-15H346.8z" className="st3"></path>
            <Tippy content={<Translate id="sankey.projectTooltip" description="The tooltip appearing when hovering over a project on the right" values={{
                projectNumber: '2',
                projectCost: (<b><Currency>250</Currency></b>),
                numVoters: (<b>5</b>),
                contributionAmount: (<Currency>50</Currency>),
              }}>
                  {'Project {projectNumber} costs {projectCost}. This cost is covered equally by the {numVoters} voters who voted for Project {projectNumber}. Each of these voters contribute {contributionAmount} from their budget share.'}
              </Translate>} placement="top" theme="light">
              <path d="M346.8 1247.9v146h114.6v-146H346.8z" className="st4"></path>
            </Tippy>
          </g>
          <g>
            <path d="M477.6 1278.9v15h91.7v-15h-91.7z" className="st3"></path>
            <Tippy content={<Translate id="sankey.projectTooltip" description="The tooltip appearing when hovering over a project on the right" values={{
                projectNumber: '3',
                projectCost: (<b><Currency>200</Currency></b>),
                numVoters: (<b>4</b>),
                contributionAmount: (<Currency>50</Currency>),
              }}>
                  {'Project {projectNumber} costs {projectCost}. This cost is covered equally by the {numVoters} voters who voted for Project {projectNumber}. Each of these voters contribute {contributionAmount} from their budget share.'}
              </Translate>} placement="top" theme="light">
              <path d="M477.6 1247.9v146h91.7v-146h-91.7z" className="st4"></path>
            </Tippy>
          </g>
          <g>
            <path d="M585.4 1278.9v15h68.8v-15h-68.8z" className="st3"></path>
            <Tippy content={<Translate id="sankey.projectTooltip" description="The tooltip appearing when hovering over a project on the right" values={{
                projectNumber: '4',
                projectCost: (<b><Currency>150</Currency></b>),
                numVoters: (<b>3</b>),
                contributionAmount: (<Currency>50</Currency>),
              }}>
                  {'Project {projectNumber} costs {projectCost}. This cost is covered equally by the {numVoters} voters who voted for Project {projectNumber}. Each of these voters contribute {contributionAmount} from their budget share.'}
              </Translate>} placement="top" theme="light">
              <path d="M585.4 1247.9v146h68.8v-146h-68.8z" className="st4"></path>
            </Tippy>
          </g>
          <g>
            <path d="M70.4 67.9v15h550.1v-15H70.4z" className="st3"></path>
            <Tippy content={<Translate id="sankey.cityTooltip" values={{
                cityBudget: (<b><Currency>1200</Currency></b>),
                voterBudget: (<b><Currency>150</Currency></b>),
              }}>
                  {'The city budget is {cityBudget}. It is divided equally between the 8 voters, so each voter gets {voterBudget}.'}
              </Translate>} placement="top" theme="light">
                <path d="M70.4 7.9v110h550.1V7.9H70.4z" className="st4"></path>
            </Tippy>
          </g>
          <text className="st5 st6" transform="translate(17.75 631.788)">
            <Translate id="sankey.voterLabel.prefix">Voter</Translate> 1
          </text>
          <text className="st7 st6" transform="translate(27.413 659.788)">
            <CurrencyString amount="150"/>
          </text>
          <text className="st5 st6" transform="translate(100.701 631.788)">
            <Translate id="sankey.voterLabel.prefix">Voter</Translate> 2
          </text>
          <text className="st7 st6" transform="translate(110.364 659.788)">
            <CurrencyString amount="150"/>
          </text>
          <text className="st5 st6" transform="translate(187.654 631.788)">
            <Translate id="sankey.voterLabel.prefix">Voter</Translate> 3
          </text>
          <text className="st7 st6" transform="translate(197.317 659.788)">
            <CurrencyString amount="150"/>
          </text>
          <text className="st5 st6" transform="translate(270.605 631.788)">
            <Translate id="sankey.voterLabel.prefix">Voter</Translate> 4
          </text>
          <text className="st7 st6" transform="translate(280.269 659.788)">
            <CurrencyString amount="150"/>
          </text>
          <text className="st5 st6" transform="translate(354.555 631.788)">
            <Translate id="sankey.voterLabel.prefix">Voter</Translate> 5
          </text>
          <text className="st7 st6" transform="translate(364.218 659.788)">
            <CurrencyString amount="150"/>
          </text>
          <text className="st5 st6" transform="translate(440.508 631.788)">
            <Translate id="sankey.voterLabel.prefix">Voter</Translate> 6
          </text>
          <text className="st7 st6" transform="translate(450.17 659.788)">
            <CurrencyString amount="150"/>
          </text>
          <text className="st5 st6" transform="translate(524.459 631.788)">
            <Translate id="sankey.voterLabel.prefix">Voter</Translate> 7
          </text>
          <text className="st7 st6" transform="translate(534.122 659.788)">
            <CurrencyString amount="150"/>
          </text>
          <text className="st5 st6" transform="translate(609.412 631.788)">
            <Translate id="sankey.voterLabel.prefix">Voter</Translate> 8
          </text>
          <text className="st7 st6" transform="translate(619.075 659.788)">
            <CurrencyString amount="150"/>
          </text>
          <text className="st5 st6" transform="translate(342 28.915)" textAnchor="middle">
            <Translate id="sankey.cityLabel" description="Label for the City on the left of the Sankey figure">City</Translate>
          </text>
          <text className="st7 st6" transform="translate(342 53.915)" textAnchor="middle">
            <CurrencyString amount="1200"/>
          </text>
          <text className="st5 st6" transform="translate(57.177 1319.877)">
            <Translate id="sankey.projectLabel.prefix">Project</Translate> 1
          </text>
          <text className="st7 st6" transform="translate(57.177 1347.877)">
            <CurrencyString amount="600"/>
          </text>
          <text className="st5 st6" transform="translate(348.187 1319.877)">
            <Translate id="sankey.projectLabel.prefix">Project</Translate> 2
          </text>
          <text className="st7 st6" transform="translate(348.187 1347.877)">
            <CurrencyString amount="250"/>
          </text>
          <text className="st5 st6" transform="translate(480.52 1319.877)">
            <Translate id="sankey.projectLabel.prefix">Project</Translate> 3
          </text>
          <text className="st7 st6" transform="translate(480.52 1347.877)">
            <CurrencyString amount="200"/>
          </text>
          <text className="st5 st6" transform="translate(586.931 1319.877)">
            <Translate id="sankey.projectLabel.prefix">Project</Translate> 4
          </text>
          <text className="st7 st6" transform="translate(586.931 1347.877)">
            <CurrencyString amount="150"/>
          </text>
          <text className="st5 st8" transform="translate(340 320.67)" textAnchor="middle">
            <Translate id="sankey.projectLabel.leftTextLine1">Step 1: The budget is divided equally</Translate>
          </text>
          <text className="st5 st8" transform="translate(340 365)" textAnchor="middle">
            <Translate id="sankey.projectLabel.leftTextLine2">among the voters</Translate>
          </text>
          <text className="st5 st8" transform="translate(340 993.452)" textAnchor="middle">
            <Translate id="sankey.projectLabel.rightTextLine1">Step 2: Projects are funded with the shares</Translate>
          </text>
          <text className="st5 st8" transform="translate(340 1038)" textAnchor="middle">
            <Translate id="sankey.projectLabel.rightTextLine2">of those who voted for them</Translate> 
          </text>
        </svg>
      );
  }
}

export default Sankey;
