import { useState } from "react";
import MixerSlider from "../components/input/MixerSlider";
import SelectList from "../components/input/SelectList";
import { getAllTunes } from "../utils/tuneData";

const Mixer = () => {
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

    const [selectedTune, setTune] = useState(localStorage.getItem("Mixer.selectedTune") ?? "");

    const selectTune = (ev) => {
        setTune(ev.target.value);
        localStorage.setItem("Mixer.selectedTune", ev.target.value);
    }

    return (
        <>
            <main>
                <div className="container-fluid">

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <SelectList
                                id="selectSong"
                                label="Select a Tune"
                                defaultOption="Choose a tune..."
                                options={ tuneOptions }
                                onChange={ selectTune }
                                value={ selectedTune }
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-8">
                            {/* TODO: Add d3 visualiser */}
                            <svg className="audioVisualiser"></svg>
                        </div>

                        <div className="col-md-4">
                            {/* TODO: Audio play functions */}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <div className="mixersContainer">
                                <MixerSlider saveKey="masterVolume">Master</MixerSlider>
                                <MixerSlider saveKey={"one"}>Mixer 1</MixerSlider>
                                <MixerSlider saveKey={"two"}>Mixer 2</MixerSlider>
                                <MixerSlider saveKey={"three"}>Mixer 3</MixerSlider>
                                <MixerSlider saveKey={"four"}>Mixer 4</MixerSlider>
                                <MixerSlider saveKey={"five"}>Mixer 5</MixerSlider>
                                <MixerSlider saveKey={"six"}>Mixer 6</MixerSlider>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}

export default Mixer;