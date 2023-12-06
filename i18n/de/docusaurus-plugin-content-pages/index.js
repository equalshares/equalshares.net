import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';

import styles from '@site/src/pages/index.module.css';

import HeroText from '@site/i18n/de/docusaurus-plugin-content-docs/current/_homepage/_herotext.mdx';
import Benefits from '@site/i18n/de/docusaurus-plugin-content-docs/current/_homepage/_benefits.mdx';
import HomepageContents from '@site/i18n/de/docusaurus-plugin-content-docs/current/_homepage/_contents.mdx';

export default function Home() {
  return (
    <Layout
    description="Die Methode der gleichen Anteile ist eine fairere Wahlmethode für partizipative Bürgerbudgets.">
    <Head>
      <title>Methode der gleichen Anteile für Bürgerbudgets</title>
      <meta name="twitter:title" content="Methode der gleichen Anteile für Bürgerbudgets" />
      <meta name="twitter:description" content="Die Methode der gleichen Anteile ist eine fairere Wahlmethode für partizipative Bürgerbudgets." />
      <meta name="twitter:image" content="https://equalshares.net/social/og-main.png" />
      <meta property="og:image" content="https://equalshares.net/social/og-main.png" />
      <meta property="og:title" content="Methode der gleichen Anteile für Bürgerbudgets" />
      <meta property="og:description" content="Die Methode der gleichen Anteile ist eine fairere Wahlmethode für partizipative Bürgerbudgets." />
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
