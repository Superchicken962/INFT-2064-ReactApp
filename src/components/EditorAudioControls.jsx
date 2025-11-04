import { useState } from "react";
import { playAudio, processAudio, procPlayAudio, setMasterVolume, stopAudio } from "../utils/audio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeDown, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

const EditorAudioControls = ({ volumeKey }) => {
    const [volume, setVolume] = useState(50);

    const changeVolume = (e) => {
        setVolume(e.target.value);
        setMasterVolume(e.target.value/100);
    }

    return (
        <>
            {/* <nav>
                <button id="process" className="btn btn-outline-primary" onClick={processAudio}>Preprocess</button>
                <button id="process_play" className="btn btn-outline-primary" onClick={procPlayAudio}>Proc & Play</button>
                <br />

                <div className="row justify-content-left">
                    <div className="col-md-2">
                        <button id="play" className="btn btn-outline-success" onClick={playAudio}>Play</button>
                    </div>

                    <div className="col-md-2">
                        <button id="stop" className="btn btn-outline-danger" onClick={stopAudio}>Stop</button>
                    </div>

                    <div className="col-md-6">
                        <input id="volume" name={ volumeKey } className="form-range" type="range" value={ volume } min="0" max="100" step="1" onChange={ changeVolume } />
                    </div>
                </div>
            </nav> */}

            <button className="btn btn-outline-primary d-block w-100 mb-2" type="button" onClick={processAudio}>Preprocess</button>
            <button className="btn btn-outline-success d-block w-100 mb-2" type="button" onClick={playAudio}>Play</button>
            <button className="btn btn-outline-danger d-block w-100 mb-2" type="button" onClick={stopAudio}>Stop</button>

            <div className="volumeContainer">
                <FontAwesomeIcon icon={faVolumeDown} />
                <input id="volume" name={ volumeKey } className="form-range d-inline-block" type="range" value={ volume } min="0" max="100" step="1" onChange={ changeVolume } />
                <FontAwesomeIcon icon={faVolumeUp} />
            </div>
        </>
    );
}

export default EditorAudioControls;