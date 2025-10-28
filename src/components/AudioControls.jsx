import { playAudio, processAudio, procPlayAudio, stopAudio } from "../App";

const AudioControls = () => {
    return (
        <>
            <nav>
                <button id="process" className="btn btn-outline-primary" onClick={processAudio}>Preprocess</button>
                <button id="process_play" className="btn btn-outline-primary" onClick={procPlayAudio}>Proc & Play</button>
                <br />
                <button id="play" className="btn btn-outline-primary" onClick={playAudio}>Play</button>
                <button id="stop" className="btn btn-outline-primary" onClick={stopAudio}>Stop</button>
            </nav>
        </>
    );
}

export default AudioControls;