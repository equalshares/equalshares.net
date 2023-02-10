import React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Sankey from '@site/src/components/Sankey';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import { CurrencySymbol } from '@site/src/components/MyComponents';

import styles from './index.module.css';

function Hero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <section className={styles.hero}>
      <div>
        <div className={styles.describeMethod}>
          <p>
            The 
              <mark>Method of Equal Shares</mark> 
            is a fairer voting rule for participatory budgeting.
          </p>
          <p>
            It provides proportional representation and allows every voter to decide about an equal part of the
            budget.
          </p>
        </div>
        <div className={styles.sideInfo}>
          <p>&mdash; <em>Key Benefits</em> &mdash;</p>
          <ul>
            <li>The rule is <strong>simple to understand</strong> and to explain.</li>
            <li>Can be used in any participatory budgeting process, no matter the scale.</li>
            <li><strong>Theoretical guarantees</strong> that all interest groups will be represented in the
              outcome.</li>
            <li><strong>Better reflects</strong> voter preferences across project categories.</li>
            <li>The voting experience is unchanged: the Method of Equal Shares works with all standard ballot
              types (approvals, knapsack voting, rankings, distributing points, etc.)</li>
            <li>Increased <strong>transparency</strong>: voters can see how their vote influenced the election.
            </li>
            <li>Straightforward to implement in any software system.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function UniversityLogo({ logo, uniName, link }) {
  return (
    <Tippy content={<span><b>{uniName}</b><br/>Contact: {link}</span>} interactive theme='light' animation='none' duration={[300,0]}>
      <img
        src={logo}
        alt={`Logo: ${uniName}`}
        id={`logo-${uniName}`}
        />
    </Tippy>
  );
}

function UniversityLogos() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <section className={styles.universityLogos}>
      <p>developed and studied by researchers at universities around the world</p>
      <div className={styles.logoList}>
          <UniversityLogo logo="img/logo-warsaw3.svg" uniName="University of Warsaw" link={<a href="https://www.mimuw.edu.pl/~ps219737/">Piotr Skowron</a>} />
          <UniversityLogo logo="img/logo-cnrs.svg" uniName="CNRS, France" link={<a href="http://dominik-peters.de/">Dominik Peters</a>} />
          <UniversityLogo logo="img/logo-toronto.svg" uniName="University of Toronto" link={<a href="https://www.cs.toronto.edu/~nisarg/index.html">Nisarg Shah</a>} />
          <UniversityLogo logo="img/logo-agh.svg" uniName="AGH University of Science and Technology, Kraków" link={<a href="https://home.agh.edu.pl/~faliszew/">Piotr Faliszewski</a>} />
          <UniversityLogo logo="img/logo-eth.svg" uniName="ETH Zurich" link={<a href="https://democracy.dsi.uzh.ch/member/joshua-yang/">Joshua Yang</a>} />
          <UniversityLogo logo="img/logo-tu-berlin.svg" uniName="TU Berlin" link={<a href="https://sites.google.com/view/jannikpeters">Jannik Peters</a>} />
          {/* <UniversityLogo logo="img/logo-tu-wien.svg" uniName="TU Wien" link={<a href="http://martin.lackner.xyz/">Martin Lackner</a>} />
          <UniversityLogo logo="img/logo-amsterdam.svg" uniName="University of Amsterdam" link={<a href="https://staff.science.uva.nl/u.endriss/">Ulle Endriss</a>} /> */}
      </div>
  </section>
  );
}

function MapSection() {
  return (
    <section className={styles.contentSectionFlex} id="how-does-it-work-section">
        <img src="img/europe_labeled-01.svg" width="400"
            className={styles.map} />
        <div>
          <p>
              Many cities are using <strong style={{color: 'var(--ifm-color-primary)'}}>Participatory Budgeting</strong> to give residents a say in how public money is spent.
              The city government sets aside a part of its budget,
              allows anyone to propose projects, and then holds
              an election to decide which projects will be funded.
          </p>
          <p>
              Notable examples are Paris and Madrid, with a
              spending of 100 million euros each year (2017-19).
          </p>
        </div>
    </section>
  )
}

function BallotExampleOption({ selected=false, children }) {
  const [isSelected, setIsSelected] = useState(selected);

  // toggle function
  const toggle = () => {
    setIsSelected(!isSelected);
  }

  if (isSelected) {
    return (
      <div className={[styles.ballotExampleOption, styles.selected].join(' ')} onClick={toggle}>{children}</div>
    );
  } else {
    return (
      <div className={styles.ballotExampleOption} onClick={toggle}>{children}</div>
    );
  }

}

function BallotExampleSection() {
  return (
  <section className={styles.contentSectionFlex} id="about-this-page-section">
    <div className={styles.ballotExplanation}>
      <p>
          Voting is a great way to involve many citizens in the budget decision.
          However, the outcome of the election is not always fair.
          Because many cities simply choose the projects with the most votes,
          the budget is often spent on several similar projects that are popular with
          the same majority group of voters.
      </p>
      <p>
          There is a voting system that leads to fairer outcomes, where each voter has an equal influence on the
          election outcome:
          <br />
          The <strong style={{color: 'var(--ifm-color-primary)'}}>Method of Equal Shares</strong>.
      </p>
    </div>
    <div className={styles.approvalBallotExample}>
        <span style={{fontWeight: 500, fontSize: '110%'}}>&mdash; PB Voting Ballot &mdash;</span>
        <span>Available budget: <CurrencySymbol/>3 000 000</span>
        <span style={{fontStyle: 'italic', marginBottom: '5px'}}>Vote for up to 8 projects</span>
        <BallotExampleOption selected>Extension of the Public Library <br /> Cost: <CurrencySymbol/>200 000</BallotExampleOption>
        <BallotExampleOption>Bicycle Racks on Main Street <br /> Cost: <CurrencySymbol/>70 000</BallotExampleOption>
        <BallotExampleOption selected>Sports Equipment in the Park <br /> Cost: <CurrencySymbol/>50 000</BallotExampleOption>
        <BallotExampleOption selected>Additional Public Toilets <br /> Cost: <CurrencySymbol/>600 000</BallotExampleOption>
        <BallotExampleOption>Free Language Courses <br /> Cost: <CurrencySymbol/>100 000</BallotExampleOption>
        <BallotExampleOption>Improve Accesibility of Town Hall <br /> Cost: <CurrencySymbol/>800 000</BallotExampleOption>
        <BallotExampleOption>Renovate Fountain in Market Square <br /> Cost: <CurrencySymbol/>65 000</BallotExampleOption>
    </div>
  </section>
  );
}

function HowItWorksSection() {
  return (
    <section className={styles.contentSection} id="how-does-it-work-section">
      <h2 style={{ textAlign: 'center' }}>The Main Idea</h2>
      <p>
          The basic idea of the Method of Equal Shares is that each voter is assigned an equal part of the budget.
          This part of the budget can only be used to fund projects that the voter has voted for.
          The method goes through all project proposals, beginning with the projects with the highest number of
          votes.
          It selects a project if it can be funded using the budget shares of those who voted for the project.
          The method divides the cost of a project equally among its supporters.
      </p>
      <div id="sankey-image" style={{ position: 'relative', minHeight: '100px' }}>
          {/* <div style={{ position: 'absolute', top: '0px', left: '10%', width: '30%'}}>
              Step 1: The budget is divided equally among the voters.
          </div>
          <div style={{ position: 'absolute', top: '0px', left: '60%', width: '35%'}}>
              Step 2: Projects are funded using the budget share of those who voted for the project.
          </div> */}
          <div className={styles.sankeyContainer}>
            <Sankey />
          </div>
      </div>
      <p>
          From the perspective of a voter, the voting experience is unchanged: they just need to fill out a ballot
          and select which projects they want to vote for. The Method of Equal Shares is then computed
          by the city (using one of the open-source implementations of the rule), thus making sure that the budget is spent fairly.
      </p>
    </section>
  )
}

function OnThisWebsiteSection() {
  return (
    <section className={styles.contentSection} id="on-this-website-section">
      <h2 style={{ textAlign: 'center' }}>What to Find on This Website</h2>
      <div className={styles.columns}>
        <div>
          <Link to="explanation"><img src="img/fund.svg"/></Link>
          <Link to="explanation"><strong>Explanation</strong></Link>
          <Link to="explanation"><span>A detailed explanation, with examples, of how the Method of Equal Shares works.</span></Link>
        </div>
        <div>
          <Link to="benefits"><img src="img/growth.svg"/></Link>
          <Link to="benefits"><strong>Benefits</strong></Link>
          <Link to="benefits"><span>Arguments that the Method of Equal Shares leads to better outcomes than other rules.</span></Link>
        </div>
        <div>
          <Link to="implementation"><img src="img/clipboard.svg"/></Link>
          <Link to="implementation"><strong>Implementation</strong></Link>
          <Link to="implementation"><span>Details and advice on how to implement an election using the Method of Equal Shares.</span></Link>
        </div>
      </div>
    </section>
  )
}

function AboutThisWebsiteSection() {
  return (
    <section className={styles.contentSection} id="about-this-website-section">
      <h2 style={{ textAlign: 'center' }}>About This Website</h2>
      <p style={{ fontSize: '1.2em' }}>
          This website was constructed and is maintained by Dominik Peters (CNRS, Université Paris Dauphine-PSL).
          Its purpose is to collect resources about the Method of Equal Shares and to provide an explanation of the method to interested members of the public,
          to city officials, and to researchers.
      </p>
    </section>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="The Method of Equal Shares is a fairer voting rule for participatory budgeting.">
      <Hero />
      <UniversityLogos />
      <MapSection />
      <BallotExampleSection />
      <HowItWorksSection />
      <OnThisWebsiteSection />
      <AboutThisWebsiteSection />
    </Layout>
  );
}
