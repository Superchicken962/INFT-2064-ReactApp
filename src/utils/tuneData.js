import { generateRandomCode } from "./common";

/**
 * Get all tunes.
 * 
 * @returns { Tune[] }
 */
export function getAllTunes() {
    try {
        const tunes = localStorage.getItem("savedTunes");
        const data = JSON.parse(tunes);
        return Object.values(data);
    } catch {
        return [];
    }
}

/**
 * Save a tune to localStorage.
 * 
 * @param { String } name - Name of tune. 
 * @param { String } data - Music data.
 * @param { String? } id - If updating data, provide an id of the tune to override. 
 */
export function saveTune(name, data, id) {
    const obj = {
        name,
        data,
        id: id ?? generateRandomCode(24),
    }

    let existing = localStorage.getItem("savedTunes") ?? "{}";
    try {
        existing = JSON.parse(existing);
    } catch {
        existing = {};
    }

    console.log(existing);
    existing[obj.id] = obj;
    localStorage.setItem("savedTunes", JSON.stringify(existing));
}

/**
 * Deletes a tune from localStorage.
 * 
 * @param { String } id - Tune id
 * @returns { Boolean } Was it deleted?
 */
export function deleteTune(id) {
    try {
        const tunes = JSON.parse(localStorage.getItem("savedTunes") ?? "{}");
        delete tunes[id];

        // Resave tunes after deleting.
        localStorage.setItem("savedTunes", JSON.stringify(tunes));

        return true;
    } catch (e) {
        console.warn("Error deleting tune:", e);
        return false;
    }
}