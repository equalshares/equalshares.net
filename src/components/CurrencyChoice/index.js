import React from "react";
import { createContext, useContext } from "react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

import Translate, {translate} from '@docusaurus/Translate';

export const CurrencyContext = createContext(null);

export function CurrencySymbol() {
  const { siteConfig, i18n } = useDocusaurusContext();
  const { currency, setCurrency } = useContext(CurrencyContext);
  const currencySymbol = currency;
  const language = i18n.currentLocale;
  if (language === 'pl') {
    return (
      <span>zł</span>
    )
  }
  return (
    <span>{currencySymbol}</span>
  );
}

export function Currency({ children }) {
  const { currency, setCurrency } = useContext(CurrencyContext);
  const { siteConfig, i18n } = useDocusaurusContext();
  const language = i18n.currentLocale;
  if (language === 'pl') {
    return (
      <span>{children} zł</span>
    );
  }
  if (language === 'fr' && (currency === '€' || currency === '$')) {
    return (
      <span>{children} {`${currency}`}</span>
    );
  }
  if (language === 'de' && currency === '€') {
    return (
      <span>{`${currency}`} {children}</span>
    );
  }
  if (language === 'nl' && currency === '€') {
    return (
      <span>{`${currency}`} {children}</span>
    );
  }
  if (language === 'hu') {
    const amountString = children.toString();
    const formattedAmount = amountString.endsWith('000')
                            ? `${amountString.slice(0, -3).trim()} e` : amountString;
    return (
      <span>{formattedAmount} Ft</span>
    );
  }
  return (
    <span>{`${currency}`}{children}</span>
  );
}

export function CurrencyString({ amount=0 }) {
  const { siteConfig, i18n } = useDocusaurusContext();
  const { currency, setCurrency } = useContext(CurrencyContext);
  const currencySymbol = currency;
  const language = i18n.currentLocale;
  if (language === 'pl') {
    return (
      `${amount} zł`
    );
  }
  if (language === 'fr' && (currency === '€' || currency === '$')) {
    return (
      `${amount} ${currency}`
    );
  }
  if (language === 'de' && currency === '€') {
    return (
      `${currency} ${amount}`
    );
  }
  if (language === 'nl' && currency === '€') {
    return (
      `${currency} ${amount}`
    );
  }
  return (
    `${currencySymbol}${amount}`
  );
}

export function CurrencyPickerNavbarItem() {
  const { siteConfig, i18n } = useDocusaurusContext();
  const { currency, setCurrency } = useContext(CurrencyContext);
  const language = i18n.currentLocale;

  // refactored version
  const currencyChoices = {
    'en': ['€','$','£'],
    'de': ['Fr. ','€'],
    'fr': ['€', '$', 'fr. '],
  };
  for (const [lang, choices] of Object.entries(currencyChoices)) {
    if (language === lang) {
      const classname = "navbar__link clean-btn currency-btn";
      return (<div className="navbar__item currency-picker">
        {choices.map((choice, index) => (
          <Tippy content={
            <span>
              <Translate 
                id="currencyChoice.tooltip" 
                description="When hovering over the currency symbols in the navbar, this tooltip is shown." 
                values={{ ThisCurrencySymbol: (<b>{choice.trim()}</b>) }}>
                  {'Click to use {ThisCurrencySymbol} as the default currency symbol in examples.'}
              </Translate>
            </span>
          } theme="light" key={index}>
            <a className={
              choice === currency ? 
                `${classname} currency-btn-active` :
                classname
            } onClick={() => setCurrency(choice)}>
              {choice.trim()}
            </a>
          </Tippy>
        ))}
      </div>);
    }
  }
  return <></>;
}