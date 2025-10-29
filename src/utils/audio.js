let globalEditor = null;

export function setGlobalEditor(gEditor) {
    globalEditor = gEditor;
}
export function getGlobalEditor() {
    return globalEditor;
}

export function playAudio() {
    globalEditor.evaluate();
}

export function stopAudio() {
    globalEditor.stop();
}

export function processAudio() {
    Proc();
}

export function procPlayAudio() {
    if (globalEditor != null) {
        Proc();
        globalEditor.evaluate();
    }
}

export function ProcessText(match, ...args) {

    let replace = ""
    if (document.getElementById('flexRadioDefault2').checked) {
        replace = "_"
    }

    return replace
}

export function Proc() {

    let proc_text = document.getElementById('proc').value
    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
    ProcessText(proc_text);
    globalEditor.setCode(proc_text_replaced)
}
