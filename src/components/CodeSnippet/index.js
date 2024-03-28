import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import Admonition from '@theme/Admonition';
import Details from '@theme/Details';

import getJavaScriptCodeSnippet from './javascriptSnippet.js';
import getPythonCodeSnippet from './pythonSnippet.js';

import styles from './styles.module.css';

export const ComputeToolButton = ({ children }) => {
    return (
        <a href="https://equalshares.net/tools/compute" target="_blank" className={styles.ComputeToolButton}>
            {children}
        </a>
    );
}

const generateCodeSnippet = (choices) => {
    if (choices.language === 'python') {
        return (<>
            <CodeBlock language='python' showLineNumbers title="equal_shares.py">
                {getPythonCodeSnippet(choices)}
            </CodeBlock>
            </>);
    } else {
        // tell people to get the fraction.js library from https://github.com/rawify/Fraction.js/blob/master/fraction.js
        return (<>
        {choices.accuracy === 'fractions' ? 
            <Admonition type="info">
                To run the code, you need the <a href="https://github.com/rawify/Fraction.js/blob/master/fraction.js" target="_blank">fraction.js</a> library.
            </Admonition> : null}
        <CodeBlock language='js' showLineNumbers title="EqualShares.js">
            {getJavaScriptCodeSnippet(choices)}
        </CodeBlock>
        </>);
    }
};

export const CustomCodeSnippetGenerator = () => {
    // Initial state
    const initialState = {
        language: "python",
        ballots: "approval",
        tieBreaking: "minCost,maxVotes",
        completion: "add1",
        add1options: ["exhaustive", "integral"],
        comparison: "none",
        accuracy: "floats"
    };

    // Mapping from internal representation to display representation
    const displayOptions = {
        language: {
            "python": "Python",
            "javascript": "JavaScript",
        },
        ballots: {
            "approval": "Approval ballots",
            "score": "Score ballots",
        },
        tieBreaking: {
            "": "None",
            "maxVotes": "In favor of higher vote count",
            "minCost": "In favor of lower cost",
            "maxCost": "In favor of higher cost",
            "maxVotes,minCost": "In favor of higher vote count, then lower cost",
            "maxVotes,maxCost": "In favor of higher vote count, then higher cost",
            "minCost,maxVotes": "In favor of lower cost, then higher vote count",
            "maxCost,maxVotes": "In favor of higher cost, then higher vote count",
        },
        completion: {
            "none": "None",
            "utilitarian": "Utilitarian (select the projects with the highest vote count)",
            "add1": "Repeated increase of voter budgets by 1 currency unit (Add1)",
            "add1u": "Repeated increase of voter budgets by 1 currency unit, followed by utilitarian completion (Add1u)",
        },
        comparison: {
            "none": "None",
            "satisfaction": "Popularity with respect to voter satisfaction",
            "exclusionRatio": "Popularity with respect to exclusion ratio",
        },
        accuracy: {
            "floats": "Use floating point numbers (faster to compute, recommended for testing)",
            "fractions": "Use exact fractions (slower to compute, recommended for official results)",
        }
    };

    // State to keep track of user choices
    const [choices, setChoices] = useState(initialState);

    // Handle option change
    const handleOptionChange = (field, value) => {
        const newChoices = { ...choices, [field]: value };
        setChoices(newChoices);
    };

    // Handle checkbox change for add1options
    const handleCheckboxChange = (value) => {
        const optionIndex = choices.add1options.indexOf(value);
        let newAdd1options = [...choices.add1options];

        if (optionIndex === -1) {
            newAdd1options.push(value);
        } else {
            newAdd1options.splice(optionIndex, 1);
        }

        handleOptionChange('add1options', newAdd1options);
    };

    // Generate checkbox options if needed
    const generateCheckboxOptions = (positionOfCheckbox) => {
        if (choices.completion === positionOfCheckbox) {
            return (
                <div>
                    <label className={styles.subOptionLabel}>
                        <input
                            type="checkbox"
                            checked={choices.add1options.includes("exhaustive")}
                            onChange={() => handleCheckboxChange("exhaustive")}
                        />
                        Stop process when exhaustive
                    </label>
                    <label className={styles.subOptionLabel}>
                        <input
                            type="checkbox"
                            checked={choices.add1options.includes("integral")}
                            onChange={() => handleCheckboxChange("integral")}
                        />
                        Use integral endowments
                    </label>
                </div>
            );
        }
        return null;
    };

    // Generate the details for each option category
    const generateDetails = (field, displayTitle, options) => (
        <Details summary={<summary><strong>{displayTitle}</strong>: {displayOptions[field][choices[field]].split('(')[0]}</summary>}>
            {Object.keys(options).map(key => (
                <label key={key} className={styles.codeSnippetLabel}>
                    <input
                        type="radio"
                        name={field}
                        value={key}
                        checked={choices[field] === key}
                        onChange={() => handleOptionChange(field, key)}
                    />
                    {options[key]}
                    {field === 'completion' && key.includes('add1') ? generateCheckboxOptions(key) : null}
                </label>
            ))}
        </Details>
    );

    return (
        <div className={styles.codeSnippetOptions}>
            {generateDetails('language', 'Language', displayOptions.language)}
            {generateDetails('ballots', 'Ballot type', displayOptions.ballots)}
            {generateDetails('tieBreaking', 'Tie breaking' , displayOptions.tieBreaking)}
            {generateDetails('completion', 'Completion method',  displayOptions.completion)}
            {generateDetails('comparison', 'Comparison step', displayOptions.comparison)}
            {generateDetails('accuracy', 'Numerical accuracy', displayOptions.accuracy)}

            {generateCodeSnippet(choices)}
        </div>
    );
};

