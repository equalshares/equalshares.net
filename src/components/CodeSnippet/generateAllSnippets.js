import getJavaScriptCodeSnippet from './javascriptSnippet.mjs';
import getPythonCodeSnippet from './pythonSnippet.mjs';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Helper function to generate all combinations of parameters
function* generateCombinations(options, optionIndex = 0, currentCombination = {}) {
  if (optionIndex >= options.length) {
    yield currentCombination;
    return;
  }

  const [category, choices] = options[optionIndex];
  
  for (const choice of choices) {
    yield* generateCombinations(options, optionIndex + 1, { ...currentCombination, [category]: choice });
  }
}

// Main function to generate snippets
function generateSnippets() {
  const optionCategories = {
    ballots: ["approval", "score"],
    tieBreaking: ["", "maxVotes", "minCost", "maxCost", "maxVotes,minCost", "maxVotes,maxCost", "minCost,maxVotes", "maxCost,maxVotes"],
    completion: ["none", "utilitarian", "add1", "add1u"],
    add1options: ["exhaustive", "integral"],
    comparison: ["none", "satisfaction", "exclusionRatio"],
    accuracy: ["floats", "fractions"],
  };

  const options = Object.entries(optionCategories);
  
  // Create 'snippets' directory if it doesn't exist
  const dir = path.join(__dirname, 'snippets');
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  for (const combination of generateCombinations(options)) {
    const nameComponents = [];
    for (const [category, choice] of Object.entries(combination)) {
      nameComponents.push(choice);
    }

    const fileName = nameComponents.join('-');
    
    // Save the combination to JSON file
    fs.writeFileSync(path.join(dir, `${fileName}.json`), JSON.stringify(combination, null, 2));

    // Generate and save the code snippets
    combination.language = 'python';
    const pythonCode = getPythonCodeSnippet(combination);
    fs.writeFileSync(path.join(dir, `${fileName}.py`), pythonCode);

    combination.language = 'javascript';
    const jsCode = getJavaScriptCodeSnippet(combination);
    fs.writeFileSync(path.join(dir, `${fileName}.js`), jsCode);
  }
}

// Run the script
generateSnippets();
