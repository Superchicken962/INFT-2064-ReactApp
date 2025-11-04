import { StrudelMirror } from "@strudel/codemirror";

/**
 * @type { StrudelMirror }
 */
let globalEditor = null;

export function setGlobalEditor(gEditor) {
    globalEditor = gEditor;
    globalEditor.audioPlaying = false;
}
/**
 * @returns { StrudelMirror }
 */
export function getGlobalEditor() {
    return globalEditor;
}

export function playAudio() {
    globalEditor.evaluate();
    globalEditor.audioPlaying = true;
}

export function stopAudio() {
    globalEditor.stop();
    globalEditor.audioPlaying = false;
}

export function processAudio() {
    Proc();
}

export function procPlayAudio() {
    if (globalEditor != null) {
        Proc();
        playAudio()
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

/**
 * Use timeout before setting audio so that when constantly changing (e.g. when sliding) it doesn't continuosly process the text.
 */
let audioChangeTimeout;

export function setMasterVolume(volume) {
    if (!globalEditor) return;

    clearTimeout(audioChangeTimeout);

    // const code = globalEditor.code;
    const procText = document.querySelector("#proc");
    const text = procText.value;

    const comment = "// Master volume, controlled dynamically";

    if (!text.includes(comment)) {
        procText.value += `\nall(x => x.gain(${volume})) ${comment}`;
    } else {
        const before = text.split(comment);
        const all = before[0].split("\n");
        // Concat line with existing value + comment, then use string replace to add new value.
        const line = `${all[all.length-1]?.trim()} ${comment}`;

        procText.value = text.replace(line, `all(x => x.gain(${volume})) ${comment}`);
    }

    audioChangeTimeout = setTimeout(() => {
        // Process & play to update volume live.
        Proc();
        
        // Only play audio again if it was already playing before.
        if (globalEditor.audioPlaying) playAudio();
    }, 200);
}