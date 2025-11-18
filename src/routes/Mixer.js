import { useContext, useRef, useState } from "react";
import MixerSlider from "../components/input/MixerSlider";
import MixerAudioControls from "../components/mixer/MixerAudioControls";
import TuneEditor from "../utils/TuneEditor";
import { strudelContext } from "../components/Strudel";
import { AlertContext } from "../components/alert/AlertContext";
import { extractVariablesFromText, setGainForVariable } from "../utils/processing";
import D3Visualiser from "../components/mixer/D3Visualiser";

const Mixer = () => {
    const strudel = useContext(strudelContext);
    const tuneEditor = useRef(new TuneEditor(strudel.getEditor()));
    const { alertRef } = useContext(AlertContext);
    const [variables, setVariables] = useState([]);

    // Handle strudel evaluation errors.
    document.addEventListener("StrudelEvalError", (ev) => {
        alertRef.current?.show(`Error evaluating: ${ev.detail}`);
    });

    const wait = {};

    const sliderInput = (ev) => {
        clearTimeout(wait[ev.rawKey]);

        if (ev.rawKey === "masterVolume") {
            tuneEditor.current.setMasterVolume(ev.value);
        } else {
            const modified = setGainForVariable(tuneEditor.current.getData(), ev.rawKey, ev.value);
            tuneEditor.current.setData(modified);
        }
        
        strudel.process(tuneEditor.current.getData());

        // Essentially wait before processing and playing again in case we change value quickly.
        wait[ev.rawKey] = setTimeout(() => {
            strudel.play();
        }, 10);
    }

    // When tune is loaded, update mixers.
    tuneEditor.current.onTuneLoaded = (tune) => {
        setVariables(extractVariablesFromText(tuneEditor.current.getData()));
        tuneEditor.current.enableLogging();
    }

    return (
        <>
            <main>
                <div className="container-fluid">

                    <div className="row mb-3">
                        <div className="col-md-8">
                            <MixerAudioControls tuneEditor={ tuneEditor.current }></MixerAudioControls>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <D3Visualiser></D3Visualiser>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="mixersContainer">
                                <MixerSlider saveKey="masterVolume" onChange={ sliderInput }>Master</MixerSlider>
                                { variables.map((v) => {
                                    return <MixerSlider
                                        key={ v.variable }
                                        saveKey={ v.variable }
                                        onChange={ sliderInput }
                                    >{ v.variable }</MixerSlider>
                                }) }
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}

export default Mixer;