import { useRef, useState } from "react";
import { playAudio, processAudio, procPlayAudio, setMasterVolume, stopAudio } from "../utils/audio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeDown, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

const EditorAudioControls = ({ volumeKey, tuneEditor }) => {
    const [volume, setVolume] = useState(50);

    const changeVolume = (e) => {
        setVolume(e.target.value);
        setMasterVolume(e.target.value/100);
    }

    const processTxt = useRef(null);

    const process = () => {
        processTxt.current.textContent = `Processed: ${tuneEditor.getSelectedTune().name}`;
        processAudio();
    }

    return (
        <>
            <div>
                <small className="d-inline-block ms-2 text-muted" ref={ processTxt }>Unprocessed</small>
                <button className="btn btn-outline-primary d-inline-block w-100 mb-2" type="button" onClick={ process }>Preprocess</button>
            </div>

            <div className="d-block text-center">
                <button className="btn btn-outline-success d-inline-block mb-2" style={{width: "46%"}} type="button" onClick={playAudio}>Play</button>
                <button className="btn btn-outline-danger d-inline-block mb-2 ms-2" style={{width: "46%"}} type="button" onClick={stopAudio}>Stop</button>  
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