import { StrudelMirror } from "@strudel/codemirror";

/**
 * @type { StrudelMirror }
 */
let globalEditor = null;

export function setGlobalEditor(gEditor) {
    globalEditor = gEditor;
}
/**
 * @returns { StrudelMirror }
 */
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
    // TODO: Make this dyanmic - showing inputs based on the <> in the text.
    let proc_text = document.getElementById('proc').value
    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
    ProcessText(proc_text);
    globalEditor.setCode(proc_text_replaced);
}

export function setAudioVolume(volume) {
    // if (!globalEditor) return;
    // console.log(globalEditor);

    // const code = globalEditor.code;
    // const comment = "// Volume set programmatically";
    
    // if (!code.includes(comment)) {
    //     globalEditor.appendCode(`\n.gain(0.2) ${comment}`);
    // }
}