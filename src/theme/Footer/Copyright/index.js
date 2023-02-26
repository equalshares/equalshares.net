import React from 'react';
import Copyright from '@theme-original/Footer/Copyright';

import Translate, {translate} from '@docusaurus/Translate';

export default function CopyrightWrapper(props) {
  const date = new Date();
  const isoDay = date.toISOString().split('T')[0];
  return (
    <>
      <Copyright {...props} />
      <div><Translate id="footer.LastUpdated">Last updated:</Translate> {isoDay}.</div>
    </>
  );
}
