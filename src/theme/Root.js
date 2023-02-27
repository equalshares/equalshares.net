import React from 'react';

import { useState, createContext, useContext } from "react";

import { CurrencyContext } from '@site/src/components/CurrencyChoice';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Root({children}) {
    const { siteConfig, i18n } = useDocusaurusContext();
    const locale = i18n.currentLocale;
    const currencySymbol = siteConfig.customFields.currencySymbol[locale];

    const [currency, setCurrency] = useState(currencySymbol);
    const value = { currency, setCurrency };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
}