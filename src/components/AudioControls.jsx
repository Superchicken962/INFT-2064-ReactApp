import { useState } from "react";
import { playAudio, processAudio, procPlayAudio, stopAudio } from "../utils/audio";

const AudioControls = ({ volumeKey }) => {
    const [volume, setVolume] = useState(50);

    const changeVolume = (e) => {
        setVolume(e.target.value);
    }

    return (
        <>
            <nav>
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
            </nav>
        </>
    );
}

export default AudioControls;