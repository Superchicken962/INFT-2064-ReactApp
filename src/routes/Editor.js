import { useEffect, useRef } from "react";
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
import PatternEditor from '../components/PatternEditor';
import { getGlobalEditor, Proc, setGlobalEditor } from "../utils/audio";

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
                
            document.getElementById('proc').value = stranger_tune
            Proc();
        }

    }, []);

    return (
        <>
            <h2>Strudel Editor</h2>
            <main>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
                            <textarea className="form-control" rows="15" id="proc" ></textarea>
                        </div>
                        <div className="col-md-4">
                            <AudioControls />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <PatternEditor />
                        </div>
                        <div className="col-md-4">
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