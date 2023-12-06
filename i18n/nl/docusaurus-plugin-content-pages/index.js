import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';

import styles from '@site/src/pages/index.module.css';

import HeroText from '@site/i18n/nl/docusaurus-plugin-content-docs/current/_homepage/_herotext.mdx';
import Benefits from '@site/i18n/nl/docusaurus-plugin-content-docs/current/_homepage/_benefits.mdx';
import HomepageContents from '@site/i18n/nl/docusaurus-plugin-content-docs/current/_homepage/_contents.mdx';

export default function Home() {
  return (
    <Layout
    description="De Methode van Gelijk Aandelen is een eerlijkere stemregel voor burgerbegroting.">
    <Head>
      <title>Methode van Gelijk Aandelen voor burgerbegroting</title>
      <meta name="twitter:title" content="Methode van Gelijk Aandelen voor burgerbegroting" />
      <meta name="twitter:description" content="De Methode van Gelijk Aandelen is een eerlijkere stemregel voor burgerbegroting." />
      <meta name="twitter:image" content="https://equalshares.net/social/og-main.png" />
      <meta property="og:image" content="https://equalshares.net/social/og-main.png" />
      <meta property="og:title" content="Methode van Gelijk Aandelen voor burgerbegroting" />
      <meta property="og:description" content="De Methode van Gelijk Aandelen is een eerlijkere stemregel voor burgerbegroting." />
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
