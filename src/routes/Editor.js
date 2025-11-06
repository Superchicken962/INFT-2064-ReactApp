import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from '../tunes';
import console_monkey_patch, { getD3Data } from '../console-monkey-patch';
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

const handleD3Data = (event) => {
    console.log(event.detail);
};

const Editor = () => {
    const hasRun = useRef(false);
    const tuneEditor = useRef(new TuneEditor(getGlobalEditor()));
    const preprocessText = useRef(null);

    const [savedTunes, setSavedTunes] = useState(getAllTunes());
    const [selectedTune, setSelection] = useState(localStorage.getItem("Editor.selectedTune") ?? "");    

    useEffect(() => {

        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
                //init canvas
                const canvas = document.getElementById('roll');
                canvas.width = canvas.width * 2;
                canvas.height = canvas.height * 2;
                const drawContext = canvas.getContext('2d');
                const drawTime = [-2, 2]; // time window of drawn haps

                setGlobalEditor(new StrudelMirror({
                    defaultOutput: webaudioOutput,
                    getTime: () => getAudioContext().currentTime,
                    transpiler,
                    root: document.getElementById('editor'),
                    drawTime,
                    onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                    prebake: async () => {
                        initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                        const loadModules = evalScope(
                            import('@strudel/core'),
                            import('@strudel/draw'),
                            import('@strudel/mini'),
                            import('@strudel/tonal'),
                            import('@strudel/webaudio'),
                        );
                        await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                    },
                }));

            // Load the selected tune into the editor.
            loadLastTune();
                
            // When text is edited, mark tune as having unsaved changes.
            preprocessText.current?.addEventListener("input", (ev) => {
                tuneEditor.current.setData(ev.target.value);
                tuneEditor.current.addUnsavedChange();
            });

            Proc();
        }

    }, []);

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
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="mt-5">
                                {/* TODO: buttons to help in editor - for example, where selected change to a tag. */}
                                <EditorAudioControls tuneEditor={ tuneEditor.current } />

                                <hr />

                                <EditorSaveControls tuneEditor={ tuneEditor.current } reloadFunc={ () => { setSavedTunes(getAllTunes()); loadLastTune(); } } />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <EffectControls strudel={ getGlobalEditor() } />
                        </div>
                    </div>
                </div>
                <canvas id="roll"></canvas>
            </main >
        </>
    );
}

export default Editor;