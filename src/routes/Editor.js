import { useContext, useEffect, useRef, useState } from "react";
import EffectControls from '../components/EffectControls';
import PatternOutput from '../components/PatternOutput';
import { getGlobalEditor, Proc, setGlobalEditor } from "../utils/audio";
import PreprocessText from "../components/PreprocessText";
import ListGroup from "../components/display/ListGroup";
import { getAllTunes, saveTune } from "../utils/tuneData";
import ListGroupItem from "../components/display/ListGroupItem";
import { removeClassFromAll } from "../utils/elements";
import EditorAudioControls from "../components/EditorAudioControls";
import EditorSaveControls from "../components/EditorSaveControls";
import TuneEditor from "../utils/TuneEditor";
import { strudelContext } from "../components/Strudel";

const Editor = () => {
    const hasRun = useRef(false);
    const strudel = useContext(strudelContext);
    const tuneEditor = useRef(new TuneEditor(strudel.getEditor()));

    // Use effect to track when strudel context loads.
    useEffect(() => {
        // Load last saved tune upon editor load.
        loadLastTune();

    }, [strudel.getEditor()]);

    const preprocessText = useRef(null);
    const canvas = useRef(null);
    
    const [savedTunes, setSavedTunes] = useState(getAllTunes());
    const [selectedTune, setSelection] = useState(localStorage.getItem("Editor.selectedTune") ?? "");

    const loadLastTune = () => {
        try {
            tuneEditor.current.loadTune(selectedTune);
            loadTuneDataIntoInput();
        } catch {
            // If tune is not found, then show message to select a new one.
            preprocessText.current.value = "Please select a tune";
            preprocessText.current.disabled = true;
        }
    }

    const loadTuneDataIntoInput = () => {
        if (preprocessText.current) {
            preprocessText.current.value = tuneEditor.current.getData();
            preprocessText.current.disabled = false;
        } 
    }

    // TODO: Load tune into editor when clicked.
    const selectTune = (ev) => {
        // If changes made without saving, prompt before changing!
        if (tuneEditor.current.hasUnsavedChanges()) {
            const choice = window.confirm("This tune has unsaved changes, are you sure you would like to load another?");
            if (!choice) return;
        }
        
        const tuneId = ev.target.id;
        tuneEditor.current.loadTune(tuneId);

        loadTuneDataIntoInput();

        // Remove active class from currently selected one, then apply to this element.
        removeClassFromAll(".list-group-item.active", "active");
        ev.target.classList.add("active");

        setSelection(tuneId);
        localStorage.setItem("Editor.selectedTune", tuneId);
    }

    const newTune = (ev) => {
        saveTune(`My Tune #${savedTunes.length}`, "");
        setSavedTunes(getAllTunes());
    }

    return (
        <>
            <main>

                <div className="container-fluid">
                    <div className="row mb-3">
                        <div className="col-md-2 mt-5">
                            <ListGroup maxHeight="50vh">
                                { savedTunes.map(t => 
                                    <ListGroupItem 
                                        id={ t.id }
                                        key={ t.id }
                                        onClick={ selectTune }
                                        active={ selectedTune === t.id }
                                    >{t.name}</ListGroupItem>
                                )}
                                <ListGroupItem onClick={ newTune }>+ New Tune</ListGroupItem>
                            </ListGroup>
                        </div>

                        <div className="col-md-8">
                            <ul className="nav nav-tabs mb-2" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="preprocess-text-input-lbl" data-bs-toggle="tab" data-bs-target="#preprocess-text-input" type="button" role="tab" aria-controls="preprocess-text-input" aria-selected="true">Edit</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="preprocess-text-output-lbl" data-bs-toggle="tab" data-bs-target="#preprocess-text-output" type="button" role="tab" aria-controls="preprocess-text-output" aria-selected="false">Output</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="canvas-roll-lbl" data-bs-toggle="tab" data-bs-target="#canvas-roll-tab" type="button" role="tab" aria-controls="canvas-roll-tab" aria-selected="false">Visualiser</button>
                                </li>

                                {/* <li className="nav-item ms-auto" role="presentation">
                                    <button className="nav-link" id="preprocess-text-output-lbl" type="button">Import</button>
                                </li> */}
                            </ul>

                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="preprocess-text-input" role="tabpanel" aria-labelledby="preprocess-text-input-lbl" tabIndex="0">
                                    <PreprocessText ref={ preprocessText } />
                                </div>
                                <div className="tab-pane fade" id="preprocess-text-output" role="tabpanel" aria-labelledby="preprocess-text-output-lbl" tabIndex="0">
                                    <PatternOutput />
                                </div>
                                <div className="tab-pane fade" id="canvas-roll-tab" role="tabpanel" arial-labelledby="canvas-roll-lbl" tabIndex="0">
                                    <canvas id="roll"></canvas>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="mt-5">
                                {/* TODO: buttons to help in editor - for example, where selected change to a tag. */}
                                <EditorAudioControls tuneEditor={ tuneEditor.current } preprocessTextRef={ preprocessText } />

                                <hr />

                                <EditorSaveControls tuneEditor={ tuneEditor.current } reloadFunc={ () => { setSavedTunes(getAllTunes()); loadLastTune(); } } />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-2">
                            <EffectControls strudel={ getGlobalEditor() } />
                        </div>

                        {/* <div className="col-md-8">
                            <canvas id="roll"></canvas>
                        </div> */}
                    </div>
                </div>
            </main >
        </>
    );
}

export default Editor;