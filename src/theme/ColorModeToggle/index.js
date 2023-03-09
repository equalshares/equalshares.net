import React from 'react';
import ColorModeToggle from '@theme-original/ColorModeToggle';

import { CurrencyPickerNavbarItem } from '@site/src/components/CurrencyChoice';

export default function ColorModeToggleWrapper(props) {
  return (
    <>
      <ColorModeToggle {...props} />
      {props.className === 'margin-right--md' && <CurrencyPickerNavbarItem/>}
    </>
  );
}
