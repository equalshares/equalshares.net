import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';

import styles from '@site/src/pages/index.module.css';

import HeroText from '@site/i18n/hu/docusaurus-plugin-content-docs/current/_homepage/_herotext.mdx';
import Benefits from '@site/i18n/hu/docusaurus-plugin-content-docs/current/_homepage/_benefits.mdx';
import HomepageContents from '@site/i18n/hu/docusaurus-plugin-content-docs/current/_homepage/_contents.mdx';

export default function Home() {
  return (
    <Layout
    description="Az egyenlő részvétel módszere egy igazságosabb szavazási módszer közösségi költségvetésekhez">
    <Head>
      <title>Egyenlő részvétel módszere közösségi költségvetésekhez</title>
      <meta name="twitter:title" content="Egyenlő részvétel módszere közösségi költségvetésekhez" />
      <meta name="twitter:description" content="Az egyenlő részvétel módszere egy igazságosabb szavazási módszer közösségi költségvetésekhez." />
      <meta name="twitter:image" content="https://equalshares.net/social/og-main.png" />
      <meta property="og:image" content="https://equalshares.net/social/og-main.png" />
      <meta property="og:title" content="Egyenlő részvétel módszere közösségi költségvetésekhez" />
      <meta property="og:description" content="Az egyenlő részvétel módszere egy igazságosabb szavazási módszer közösségi költségvetésekhez." />
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
