import { useEffect, useState } from "react";
import { extractVariablesFromText } from "../utils/processing";

const EditorEffectControls = ({ tuneEditor, preprocessTextRef }) => {
    const [vars, setVars] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        const el = preprocessTextRef.current;
        if (!el) return;

        const listener = () => {
            setText(el.value);
        }

        el.addEventListener("input", listener);

        // Ensure the listener is later remvoed as to not stack them up.
        return () => {
            el.removeEventListener("input", listener);
        }
    }, []);

    // Update list of variables when text is changed.
    useEffect(() => {
        setVars(extractVariablesFromText(tuneEditor.getData()));
    }, [text]);

    return (
        <>
            <h3>Variables in Tune</h3>
            <p className="text-muted">
                The following variables will appear on the mixer page as sliders that can be interacted with to
                control the gain of the associated element. To add a variable, append a '$' to the start of the element name.
            </p>

            <ul>
                { vars.map((v, i) => {
                    return <li key={i}>
                        { v.variable }
                    </li>
                }) }
            </ul>

            <small className="text-muted">Make sure to save the tune!</small>
        </>
    );
}

export default EditorEffectControls;