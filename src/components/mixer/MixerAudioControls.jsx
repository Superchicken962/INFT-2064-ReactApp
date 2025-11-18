import { useContext, useEffect, useState } from "react";
import { strudelContext } from "../Strudel";
import SelectList from "../input/SelectList";
import { getAllTunes } from "../../utils/tuneData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { AlertContext } from "../alert/AlertContext";

const MixerAudioControls = ({ tuneEditor }) => {
    const strudel = useContext(strudelContext);
    const [selectedTune, setTune] = useState(localStorage.getItem("Mixer.selectedTune") ?? "");
    const { alertRef } = useContext(AlertContext);

    // Get tunes & format to fit into the SelectList.
    const tuneOptions = getAllTunes().map(t => {
        return {
            name: t.name,
            value: t.id
        }
    });

    // Add an additional option - clicking this will open a prompt to import a song.
    tuneOptions.push({
        name: "+ Import Tune",
        value: "import",
        onSelect: (ev) => {
            console.log("import tune");
        },
        // This prevents the 'onChange' listener from being fired, so that this selected value (import song) is not stored.
        preventDefault: true
    });

    const selectTune = (ev) => {
        setTune(ev.target.value);
        localStorage.setItem("Mixer.selectedTune", ev.target.value);
    }

    const playAudio = async() => {
        try {
            strudel.process(tuneEditor.getData());
            await strudel.play();
        } catch(e) {
            alertRef.current?.show(e.toString() ?? "Error playing audio");
        }
    }

    useEffect(() => {
        try {
            tuneEditor.loadTune(selectedTune);
            strudel.process(tuneEditor.getData());
        } catch(e) {
            alertRef.current?.show(e.toString());
        }

    }, [selectedTune]);

    return (
        <>
            <div className="row">
                <div className="col-md-8">
                    <SelectList
                        id="selectSong"
                        label="Select a Tune"
                        defaultOption="Choose a tune..."
                        options={ tuneOptions }
                        onChange={ selectTune }
                        value={ selectedTune }
                    />
                </div>

                <div className="col-md-4" style={{ marginTop: "32px" }}>
                    <button className="btn btn-outline-success me-2" onClick={ playAudio }>
                        <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                    </button>
                    <button className="btn btn-outline-danger" onClick={ strudel.stop }>
                        <FontAwesomeIcon icon={faStop}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </>
    );
}

export default MixerAudioControls;