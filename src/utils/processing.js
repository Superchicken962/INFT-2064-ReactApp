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
 * Add to the end of content that is labelled by a given variable.
 * 
 * @param { String } text - Text to search in.
 * @param { String } variable - Variable to search for.
 * @param { String } add - Text to add.
 * @returns { String } Modified text.
 */
export function addToEndOfVariableContent(text, variable, add) {
    const vars = extractVariablesFromText(text);
    const foundVar = vars.find(v => v.variable === variable);
    if (!foundVar) return text;

    console.log(foundVar);
}