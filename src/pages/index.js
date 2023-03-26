import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';

import styles from './index.module.css';

import HeroText from '@site/docs/_homepage/_herotext.mdx';
import Benefits from '@site/docs/_homepage/_benefits.mdx';
import HomepageContents from '@site/docs/_homepage/_contents.mdx';

export default function Home() {
  return (
    <Layout
    description="The Method of Equal Shares is a fairer voting rule for participatory budgeting. This website explains how it works and why to use it.">
    <Head>
      <title>Method of Equal Shares for Participatory Budgeting</title>
      <meta name="twitter:title" content="Method of Equal Shares for Participatory Budgeting" />
      <meta name="twitter:description" content="The Method of Equal Shares is a fairer voting rule for participatory budgeting. This website explains how it works and why to use it." />
      <meta name="twitter:image" content="https://equalshares.net/social/og-main.png" />
      <meta property="og:image" content="https://equalshares.net/social/og-main.png" />
      <meta property="og:title" content="Method of Equal Shares for Participatory Budgeting" />
      <meta property="og:description" content="The Method of Equal Shares is a fairer voting rule for participatory budgeting. This website explains how it works and why to use it." />
    </Head>
      <section className={styles.hero}>
        <div>
          <div className={styles.describeMethod}>
            <HeroText/>
          </div>
          <div className={styles.sideInfo}>
            <Benefits/>
          </div>
        </div>
      </section>
      <HomepageContents/>
    </Layout>
  );
}
