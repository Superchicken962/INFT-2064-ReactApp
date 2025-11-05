import { useState } from "react";
import { getFileInput } from "../utils/common";
import Tune from "../utils/Tune";
import { saveTune } from "../utils/tuneData";

const EditorSaveControls = ({ tuneEditor, reloadFunc }) => {
    const importFile = () => {
        getFileInput(".json", (fileName, content) => {
            const tune = Tune.fromJson(content);
            saveTune(tune.name, tune.data, tune.id);

            // Probably a stupid way of doing it, but essentially given a reload function from the editor, call it once new tune is made to update the list.
            reloadFunc?.();
        });
        // TODO: Handle errors!
    }

    return (
        <>
            <button className="btn btn-outline-success d-block w-100 mb-2" type="button" onClick={ importFile }>Import</button>
            <button className="btn btn-outline-warning d-block w-100 mb-2" type="button">Export</button>
        </>
    );
}

export default EditorSaveControls;