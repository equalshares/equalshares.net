import React from 'react';
import Copyright from '@theme-original/Footer/Copyright';

import Translate, {translate} from '@docusaurus/Translate';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function CopyrightWrapper(props) {
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <Copyright {...props} />
      <div><Translate id="footer.LastUpdated">Last updated:</Translate> {siteConfig.customFields.buildDate}.</div>
    </>
  );
}
