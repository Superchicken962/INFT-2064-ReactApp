import { useState } from "react";

const EditorSaveControls = () => {
    return (
        <>
            <button className="btn btn-outline-success d-block w-100 mb-2" type="button">Import</button>
            <button className="btn btn-outline-warning d-block w-100 mb-2" type="button">Export</button>
        </>
    );
}

export default EditorSaveControls;