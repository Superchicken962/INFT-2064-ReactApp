import { useState } from "react";
import { downloadFile, getFileInput } from "../utils/common";
import Tune from "../utils/Tune";
import { deleteTune, saveTune } from "../utils/tuneData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faFileImport, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

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

    const exportFile = () => {
        const tune = tuneEditor.getSelectedTune();
        downloadFile(`${tune.name}.json`, JSON.stringify(tune));
    }

    const save = () => {
        tuneEditor.saveTune();
    }

    const del = () => {
        const conf = window.confirm("Are you sure you want to delete this tune? This can not be undone.");
        if (!conf) return;

        tuneEditor.deleteTune();
        reloadFunc?.();
    }

    return (
        <>
            <button className="btn btn-outline-success d-block w-100 mb-2" type="button" onClick={ importFile }>
                <FontAwesomeIcon icon={ faFileImport } /> Import
            </button>
            <button className="btn btn-outline-warning d-block w-100 mb-2" type="button" onClick={ exportFile }>
                <FontAwesomeIcon icon={ faFileExport } /> Export
            </button>

            <hr />

            <button className="btn btn-outline-success d-block w-100 mb-2" type="button" onClick={ save }>
                <FontAwesomeIcon icon={ faSave } /> Save
            </button>
            <button className="btn btn-outline-danger d-block w-100 mb-2" type="button" onClick={ del }>
                <FontAwesomeIcon icon={ faTrash } /> Delete
            </button>
        </>
    );
}

export default EditorSaveControls;