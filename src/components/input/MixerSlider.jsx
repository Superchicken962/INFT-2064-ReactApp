// A slider - like a range input, but bigger and in fashion of a dj slider.

import { useState } from "react";

const MixerSlider = ({ saveKey }) => {
    // Prepend 'MixerSlider' to this so that it does not conflict with other components.
    const KEY_NAME = `MixerSlider.${saveKey}`;
    const [value, setValue] = useState(localStorage.getItem(KEY_NAME) ?? 0.5);

    const changeValue = (ev) => {
        setValue(ev.target.value);
        // Save the state to localStorage.
        localStorage.setItem(KEY_NAME, ev.target.value);
    }

    return (
        <>
            <div className="mixerSlider">
                <input type="range" className="form-range" value={ value } onChange={ changeValue } max="1" min="0" step="0.01" />
            </div>
        </>
    );
}

export default MixerSlider;