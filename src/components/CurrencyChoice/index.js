import React from "react";
import { createContext, useContext } from "react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const CurrencyContext = createContext(null);

export function CurrencySymbol() {
  const { siteConfig, i18n } = useDocusaurusContext();
  const currencySymbol = siteConfig.customFields.currencySymbol;
  const language = i18n.currentLocale;
  if (language === 'pl') {
    return (
      <span>zł</span>
    )
  }
  if (language === 'de') {
    return (
      <span>Fr. </span>
    )
  }
  return (
    <span>{currencySymbol}</span>
  );
}

export function Currency({ children }) {
  const { siteConfig, i18n } = useDocusaurusContext();
  const currencySymbol = siteConfig.customFields.currencySymbol;
  const language = i18n.currentLocale;
  if (language === 'pl') {
    return (
      <span>{children} zł</span>
    );
  } 
  if (language === 'de') {
    return (
      <span>Fr. {children}</span>
    );
  }
  const { currency, setCurrency } = useContext(CurrencyContext);
  return (
    <span>{`${currency}`}{children}</span>
  );
}

export function CurrencyString({ amount=0 }) {
  const { siteConfig, i18n } = useDocusaurusContext();
  const currencySymbol = siteConfig.customFields.currencySymbol;
  const language = i18n.currentLocale;
  if (language === 'pl') {
    return (
      `${amount} zł`
    );
  }
  if (language === 'de') {
    return (
      `Fr. ${amount}`
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

  return <div className="navbar__item">
    <a className="navbar__link clean-btn" onClick={() => setCurrency('$')}>$</a> 
    <a className="navbar__link clean-btn" onClick={() => setCurrency('€')}>€</a> 
    <a className="navbar__link clean-btn" onClick={() => setCurrency('£')}>£</a>
  </div>;
}