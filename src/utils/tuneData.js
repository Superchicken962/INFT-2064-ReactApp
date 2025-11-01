import { generateRandomCode } from "./common";

/**
 * Get all tunes.
 */
export function getAllTunes() {
    try {
        const tunes = localStorage.getItem("savedTunes");
        return JSON.parse(tunes);
    } catch {
        return [];
    }
}

/**
 * Save a tune to localStorage.
 * 
 * @param { String } name - Name of tune. 
 * @param { String } data - Music data. 
 */
export function saveTune(name, data) {
    const obj = {
        name,
        data,
        id: generateRandomCode(24),
    }

    let existing = localStorage.getItem("savedTunes");
    try {
        existing = JSON.parse(existing);
    } catch {
        existing = [];
    }

    existing.push(obj);
    localStorage.setItem("savedTunes", JSON.stringify(existing));
}