import { forwardRef, useImperativeHandle, useState } from "react";
import Alert from "./Alert";

const AlertManager = forwardRef((props, ref) => {
    const [alertMsg, setAlertMsg] = useState(null);
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        show: (msg) => {
            setAlertMsg(msg);
            setVisible(true);
        },

        hide: () => {
            setAlertMsg(null);
            setVisible(false);
        }
    }));

    // Do not render if alert is not visible.
    if (!visible) return null;

    return (
        <>
            <Alert onClose={ () => setVisible(false) }>
                { alertMsg }
            </Alert>
        </>
    );
});

export default AlertManager;