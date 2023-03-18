import React from 'react';

import { useState, createContext, useContext } from "react";

import { CurrencyContext } from '@site/src/components/CurrencyChoice';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Root({children}) {
    const { siteConfig, i18n } = useDocusaurusContext();
    const locale = i18n.currentLocale;
    const currencySymbol = siteConfig.customFields.currencySymbol[locale];

    const [currency, setCurrency] = useState(currencySymbol);
    const value = { currency, setCurrency };

    const [preferredLangUsed, setPreferredLangUsed] = useState(false);

    return (
        <CurrencyContext.Provider value={value}>
            {children}
            <BrowserOnly>
                {() => {
                    if (!preferredLangUsed) {
                        const navigatorLanguages = navigator.languages;
                        if (locale === 'en') {
                            const defaultCurrency = {
                                'en-US': '$',
                                'en-AU': '$',
                                'en-CA': '$',
                                'en-GB': '£',
                                'en-NZ': '$',
                                'de-DE': '€',
                                'de-AT': '€',
                                'fr-FR': '€',
                                'fr-CA': '$',
                                'fr-CH': 'fr. ',
                            }
                            for (const navigatorLanguage of navigatorLanguages) {
                                if (defaultCurrency[navigatorLanguage]) {
                                    setCurrency(defaultCurrency[navigatorLanguage]);
                                    break;
                                }
                            }
                        }
                        if (locale === 'de') {
                            const defaultCurrency = {
                                'de-CH': 'Fr. ',
                                'de-DE': '€',
                                'de-AT': '€',
                            }
                            for (const navigatorLanguage of navigatorLanguages) {
                                if (defaultCurrency[navigatorLanguage]) {
                                    setCurrency(defaultCurrency[navigatorLanguage]);
                                    break;
                                }
                            }
                        }
                        setPreferredLangUsed(true);
                    }
                }}
            </BrowserOnly>
        </CurrencyContext.Provider>
    );
}