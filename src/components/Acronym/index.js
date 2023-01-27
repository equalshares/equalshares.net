import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function Acronym({acronym, tooltip}) {
  return (
    <Tippy content={tooltip} theme='light'>
      <abbr title={tooltip}>{acronym}</abbr>
    </Tippy>
  );
}