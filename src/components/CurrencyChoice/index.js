import React from "react";
import { createContext, useContext } from "react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

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
          <a className={
            choice === currency ? 
              `${classname} currency-btn-active` :
              classname
          } onClick={() => setCurrency(choice)} key={index}>{choice.trim()}</a>
        ))}
      </div>);
    }
  }
  return <></>;
}