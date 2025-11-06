/**
 * Extracts variables from a song text.
 * 
 * @param { String } text 
 */
export function extractVariablesFromText(text) {
    // Regexp pattern to search for all "variables" in tune - worsd that preceed colon.
    const reg = /(?<=:)(.*)/g;

    const matches = [...text.matchAll(reg)];
    console.log(matches);
}