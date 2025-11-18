import { createContext, useCallback, useEffect, useRef } from "react";
import console_monkey_patch from "../console-monkey-patch";
import { StrudelMirror } from "@strudel/codemirror";
import { Proc, setGlobalEditor } from "../utils/audio";
import { getAudioContext, initAudioOnFirstClick, registerSynthSounds, webaudioOutput } from "@strudel/webaudio";
import { drawPianoroll } from "@strudel/draw";
import { registerSoundfonts } from "@strudel/soundfonts";
import { transpiler } from "@strudel/transpiler";
import { evalScope } from "@strudel/core";

export const strudelContext = createContext(null);

const handleD3Data = (event) => {
    console.log(event.detail);
};

const Strudel = ({ children }) => {
    const hasRun = useRef(false);
    const editorRef = useRef(null);

    // Set the canvas of strudel.
    const useCanvas = useCallback((canvas) => {
        if (!editorRef.current) return;
        if (!canvas) return;

        canvas.width = canvas.width * 2;
        canvas.height = canvas.height * 2;
        const drawContext = canvas.getContext('2d');
        const drawTime = [-2, 2]; // time window of drawn haps

        editorRef.current.onDraw = (haps, time) => drawPianoroll({
            haps, time, ctx: drawContext, drawTime, fold: 0
        });

        return true;
    });

    // Set the output / root of strudel.
    const useOutput = useCallback((outputEl) => {
        if (!editorRef.current) return;

        console.log(editorRef.current);
        editorRef.current.root = outputEl;
    });

    useEffect(() => {

        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;

            const strudelMirror = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                drawTime: [-2, 2],
                onDraw: null,
                // Use temporary root instead of null so it does not crash - would try to call querySelector frm null.
                root: document.createElement("div"),
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
            });

            editorRef.current = strudelMirror;
        }

    }, []);

    const process = (text) => {
        editorRef.current?.setCode(text);
    }
    
    const play = () => {
        if (!editorRef.current) return;
        
        editorRef.current.audioPlaying = true;
        return editorRef.current?.evaluate();
    }

    const stop = () => {
        if (!editorRef.current) return;

        editorRef.current.audioPlaying = false;
        return editorRef.current.stop();
    }

    return (
        <>
            <strudelContext.Provider value={{ 
                getEditor: () => { return editorRef.current }, 
                useCanvas, 
                useOutput,
                process,
                play,
                stop
            }}>
                { children }
            </strudelContext.Provider>
        </>
    );
}

export default Strudel;