import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';

import styles from '@site/src/pages/index.module.css';

import HeroText from '@site/i18n/fr/docusaurus-plugin-content-docs/current/_homepage/_herotext.mdx';
import Benefits from '@site/i18n/fr/docusaurus-plugin-content-docs/current/_homepage/_benefits.mdx';
import HomepageContents from '@site/i18n/fr/docusaurus-plugin-content-docs/current/_homepage/_contents.mdx';

export default function Home() {
  return (
    <Layout
    description="The Method of Equal Shares is a fairer voting rule for participatory budgeting.">
    <Head>
      <title>Method of Equal Shares for Participatory Budgeting</title>
      <meta name="twitter:title" content="Method of Equal Shares for Participatory Budgeting" />
      <meta name="twitter:description" content="The Method of Equal Shares is a fairer voting rule for participatory budgeting." />
      <meta name="twitter:image" content="https://equalshares.net/social/og-main.png" />
      <meta property="og:image" content="https://equalshares.net/social/og-main.png" />
      <meta property="og:title" content="Method of Equal Shares for Participatory Budgeting" />
      <meta property="og:description" content="The Method of Equal Shares is a fairer voting rule for participatory budgeting." />
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
