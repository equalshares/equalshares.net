import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';

import styles from '@site/src/pages/index.module.css';

import HeroText from '@site/i18n/pl/docusaurus-plugin-content-docs/current/_homepage/_herotext.mdx';
import Benefits from '@site/i18n/pl/docusaurus-plugin-content-docs/current/_homepage/_benefits.mdx';
import HomepageContents from '@site/i18n/pl/docusaurus-plugin-content-docs/current/_homepage/_contents.mdx';

export default function Home() {
  return (
    <Layout
    description="Metoda równych udziałów to bardziej sprawiedliwa metoda liczenia głosów dla budżetów obywatelskich.">
    <Head>
      <title>Metoda równych udziałów dla budżetu obywatelskiego</title>
      <meta name="twitter:title" content="Metoda równych udziałów dla budżetu obywatelskiego." />
      <meta name="twitter:description" content="Metoda równych udziałów to bardziej sprawiedliwa metoda liczenia głosów dla budżetów obywatelskich." />
      <meta name="twitter:image" content="https://equalshares.net/social/og-main.png" />
      <meta property="og:image" content="https://equalshares.net/social/og-main.png" />
      <meta property="og:title" content="Method of Equal Shares for Participatory Budgeting" />
      <meta property="og:description" content="Metoda równych udziałów to bardziej sprawiedliwa metoda liczenia głosów dla budżetów obywatelskich." />
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
