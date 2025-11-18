/**
 * Extracts variables from a song text.
 * 
 * @param { String } text 
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