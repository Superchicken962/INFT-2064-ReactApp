import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeDown, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { strudelContext } from "./Strudel";
import { AlertContext } from "./alert/AlertContext";

const EditorAudioControls = ({ volumeKey, tuneEditor, preprocessTextRef }) => {
    const strudel = useContext(strudelContext);
    const [volume, setVolume] = useState(50);
    const { alertRef } = useContext(AlertContext);

    useEffect(() => {
        // When text is edited, mark tune as having unsaved changes.
        preprocessTextRef.current?.addEventListener("input", (ev) => {
            tuneEditor.setData(ev.target.value);
            tuneEditor.addUnsavedChange();
        });
    }, [preprocessTextRef]);

    const changeVolume = (e) => {
        setVolume(e.target.value);
        
        tuneEditor.setMasterVolume(e.target.value/100);
        preprocessTextRef.current.value = tuneEditor.getData();

        // Process + play to apply changes live.
        process();
        playAudio();
    }

    const processTxt = useRef(null);

    const process = () => {
        strudel.process(preprocessTextRef.current.value);
        processTxt.current.textContent = `Processed: ${tuneEditor.getSelectedTune().name}`;
    }

    const playAudio = async() => {
        try {
            await strudel.play();
        } catch(e) {
            alertRef.current?.show(e.toString() ?? "Error playing audio");
        }
    }

    return (
        <>
            <div>
                <small className="d-inline-block ms-2 text-muted" ref={ processTxt }>Unprocessed</small>
                <button className="btn btn-outline-primary d-inline-block w-100 mb-2" type="button" onClick={ process }>Preprocess</button>
            </div>

            <div className="d-block text-center">
                <button className="btn btn-outline-success d-inline-block mb-2" style={{width: "46%"}} type="button" onClick={ playAudio }>Play</button>
                <button className="btn btn-outline-danger d-inline-block mb-2 ms-2" style={{width: "46%"}} type="button" onClick={ strudel.stop }>Stop</button>  
            </div>

            <div className="volumeContainer">
                <FontAwesomeIcon icon={faVolumeDown} />
                <input id="volume" name={ volumeKey } className="form-range d-inline-block" type="range" value={ volume } min="0" max="100" step="1" onChange={ changeVolume } />
                <FontAwesomeIcon icon={faVolumeUp} />
            </div>
        </>
    );
}

export default EditorAudioControls;