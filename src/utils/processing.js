/**
 * Extracts variables from a song text.
 * 
 * @param { String } text 
 * @returns { Object[] }
 */
export function extractVariablesFromText(text) {
    // Regexp pattern to search for all "variables" in tune - worsd that preceed colon.
    const reg = /\$([a-zA-Z0-9_]+)\s*([^;]*)/g;
    const vars = [];

    for (const m of text.matchAll(reg)) {
        vars.push({
            variable: m[1],
            content: m[2].trim()
        });
    }

    return vars;
}

/**
 * Set the gain for an effect given the variable name.
 * 
 * @param { String } text - Text to search in.
 * @param { String } variable - Variable to search for.
 * @param { String | Number } gainAmt - Value to set gain to.
 * @returns { String } Modified text.
 */
export function setGainForVariable(text, variable, gainAmt) {
    const vars = extractVariablesFromText(text);
    const foundVar = vars.find(v => v.variable === variable);
    if (!foundVar) return text;

    let varText = foundVar.content;
    // Remove .gain() if it is present.
    if (varText.includes(".gain(")) {
        varText = varText.split(".gain(")[0];
    }

    varText += `.gain(${gainAmt})`

    // Replace original variable content, with new modified one.
    return text.replace(foundVar.content, varText);
}