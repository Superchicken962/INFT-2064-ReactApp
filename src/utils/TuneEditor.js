class TuneEditor {
    #strudel;
    /** @type { Tune } */
    #tune;

    constructor(globalEditor) {
        this.#strudel = globalEditor;
    }

    /**
     * Load a tune into the editor.
     * 
     * @param { Tune } tuneData - Tune data string. 
     */
    loadTune(tuneData) {
        this.#tune = tuneData;
    }

    /**
     * Gets the data.
     * 
     * @returns { String }
     */
    getData() {
        return this.#tune?.data ?? "";
    }

    #setData(val) {
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
            this.#setData(this.getData() + `\nall(x => x.gain(${volume})) ${comment}`);
        } else {
            const before = text.split(comment);
            const all = before[0].split("\n");
            // Concat line with existing value + comment, then use string replace to add new value.
            const line = `${all[all.length-1]?.trim()} ${comment}`;

            this.#setData(text.replace(line, `all(x => x.gain(${vol})) ${comment}`));
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
}