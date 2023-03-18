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
    description="La méthode des parts égales est une règle de vote plus juste pour le budget participatif.">
    <Head>
      <title>Méthode des parts pour les budgets participatifs</title>
      <meta name="twitter:title" content="Méthode des parts pour les budgets participatifs" />
      <meta name="twitter:description" content="La méthode des parts égales est une règle de vote plus juste pour le budget participatif." />
      <meta name="twitter:image" content="https://equalshares.net/social/og-main.png" />
      <meta property="og:image" content="https://equalshares.net/social/og-main.png" />
      <meta property="og:title" content="Méthode des parts pour les budgets participatifs" />
      <meta property="og:description" content="La méthode des parts égales est une règle de vote plus juste pour le budget participatif." />
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
