import MixerSlider from "../components/input/MixerSlider";

const Mixer = () => {

    return (
        <>
            <h2>Mixer</h2>

            <main>
                <div className="container-fluid">

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
                                <MixerSlider saveKey={"one"}>Mixer 1</MixerSlider>
                                <MixerSlider saveKey={"two"}>Mixer 2</MixerSlider>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}

export default Mixer;