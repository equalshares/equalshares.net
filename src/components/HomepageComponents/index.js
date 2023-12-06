import React from 'react';
import styles from '@site/src/pages/index.module.css';
import { useState } from 'react';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import Translate, {translate} from '@docusaurus/Translate';

export function UniversityLogo({ logo, uniName, link, maxWidth }) {
  const imgStyle = maxWidth ? { maxWidth: maxWidth } : {};

  return (
    <Tippy content={<span><b>{uniName}</b><br/><Translate id="homepage.universityLogoTooltipContact">Contact:</Translate> {link}</span>} interactive theme='light' animation='none' duration={[300,0]}>
      <img
        src={require('@site/static/img/'+logo).default}
        alt={`Logo: ${uniName}`}
        id={`logo-${uniName}`}
        style={imgStyle}
        />
    </Tippy>
  );
}

export function BallotExampleOption({ selected=false, children }) {
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