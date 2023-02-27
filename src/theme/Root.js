import React from 'react';

import { useState, createContext, useContext } from "react";

import { CurrencyContext } from '@site/src/components/CurrencyChoice';

export default function Root({children}) {
    const [currency, setCurrency] = useState("£");
    const value = { currency, setCurrency };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
}