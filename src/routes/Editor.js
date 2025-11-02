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
import AudioControls from '../components/AudioControls';
import EffectControls from '../components/EffectControls';
import PatternOutput from '../components/PatternOutput';
import { getGlobalEditor, Proc, setGlobalEditor } from "../utils/audio";
import PreprocessText from "../components/PreprocessText";
import ListGroup from "../components/display/ListGroup";
import { getAllTunes, saveTune } from "../utils/tuneData";
import ListGroupItem from "../components/display/ListGroupItem";
import { removeClassFromAll } from "../utils/elements";

const handleD3Data = (event) => {
    console.log(event.detail);
};

const Editor = () => {
    const hasRun = useRef(false);

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

                // const audioCtx = getAudioContext();

                // Create new node for managing global volume/gain and add to editor object.
                // const volNode = new GainNode(audioCtx, { gain: 0.2 });
                // volNode.connect(audioCtx.destination);

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

                // getGlobalEditor().volume = volNode;
                
            document.getElementById('proc').value = stranger_tune
            Proc();
        }

    }, []);

    const [savedTunes, setSavedTunes] = useState(getAllTunes());
    const [selectedTune, setSelection] = useState(localStorage.getItem("Editor.selectedTune") ?? "");

    // TODO: Load tune into editor when clicked.
    const selectTune = (ev) => {
        const tuneId = ev.target.id;

        // TODO: Load tune data into editor & perhaps save data from previous tune beforehand.

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
                        <div className="col-md-4 mt-5">
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
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="preprocess-text-input" role="tabpanel" aria-labelledby="preprocess-text-input-lbl" tabIndex="0">
                                    <PreprocessText />
                                </div>
                                <div className="tab-pane fade" id="preprocess-text-output" role="tabpanel" aria-labelledby="preprocess-text-output-lbl" tabIndex="0">
                                    <PatternOutput />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <AudioControls />
                        </div>
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