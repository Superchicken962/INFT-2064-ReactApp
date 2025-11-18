import Tune from "./Tune";
import { deleteTune, getAllTunes, saveTune } from "./tuneData";

export default class TuneEditor {
    #strudel;
    /** @type { Tune } */
    #tune;

    #unsavedChanges = false;

    constructor(globalEditor) {
        this.#strudel = globalEditor;
    }

    /**
     * Load a tune into the editor.
     * 
     * @param { Tune | String } tune - Tune data object, name of tune or tune id. 
     */
    loadTune(tune) {
        let tuneObj = tune;
        
        // If given tune is a string (tune name), then find tune in localStorage with same name.
        if (typeof tune === "string") {
            const all = getAllTunes();
            tuneObj = all.find(t => t.name === tune || t.id === tune);
        }

        if (!tuneObj) {
            throw new Error("Tune not provided, or tune with given name not found!");
        }

        this.setData(tuneObj.data);
        this.#tune = tuneObj;
        this.#unsavedChanges = false;

        if (typeof this.onTuneLoaded === "function") this.onTuneLoaded(tuneObj);
    }

    /**
     * onload listener for when a tune is loaded. 
     */
    onTuneLoaded = null;

    /**
     * Save the current tune in editor to storage.
     */
    saveTune() {
        if (!this.#tune) {
            throw new Error("No tune has been loaded!");
        }

        saveTune(this.#tune.name, this.#tune.data, this.#tune.id);
        this.#unsavedChanges = false;
    }

    /**
     * Gets the data.
     * 
     * @returns { String }
     */
    getData() {
        return this.#tune?.data ?? "";
    }

    setData(val) {
        if (!this.#tune) return;
        this.#tune.data = val;
    }

    /**
     * Set the master volume of the tune.
     * 
     * @param { Number } vol - Number between 0 and 1 to use for volume.
     * @returns { String } Modified data
     */
    setMasterVolume(vol) {
        const text = this.getData();
        const comment = "// Master volume, controlled dynamically";

        if (!text.includes(comment)) {
            this.setData(this.getData() + `\nall(x => x.gain(${vol})) ${comment}`);
        } else {
            const before = text.split(comment);
            const all = before[0].split("\n");
            // Concat line with existing value + comment, then use string replace to add new value.
            const line = `${all[all.length-1]?.trim()} ${comment}`;

            this.setData(text.replace(line, `all(x => x.gain(${vol})) ${comment}`));
        }

    }

    /**
     * Sets overall speed of the tune.
     * 
     * @param { Number } speed - Speed to set.
     */
    setSpeed(speed) {
        // TODO
    }

    /**
     * Set unsaved change to true.
     */
    addUnsavedChange() {
        this.#unsavedChanges = true;
    }

    /**
     * Does the tune have unsaved changes?
     * 
     * @returns { Boolean }
     */
    hasUnsavedChanges() {
        return this.#unsavedChanges;
    }

    /**
     * Deletes the currently selected tune.
     */
    deleteTune() {
        if (!this.#tune) {
            throw new Error("No tune has been loaded!");
        }

        return deleteTune(this.#tune.id);
    }

    /**
     * Get the currently selected tune.
     * 
     * @returns { Tune }
     */
    getSelectedTune() {
        // Return a copy.
        return JSON.parse(JSON.stringify(this.#tune));
    }
}