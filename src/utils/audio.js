import { StrudelMirror } from "@strudel/codemirror";
import TuneEditor from "./TuneEditor";

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

export function processAudio(procInput) {
    Proc(procInput);
}

export function procPlayAudio(procInput) {
    if (globalEditor != null) {
        Proc(procInput);
        playAudio();
    }
}

export function ProcessText(match, ...args) {

    let replace = ""
    if (document.getElementById('flexRadioDefault2')?.checked) {
        replace = "_"
    }

    return replace
}

export function Proc(procInput) {
    if (!procInput) return;

    // TODO: Make this dyanmic - showing inputs based on the <> in the text.
    const procText = procInput?.value;
    const processedText = procText.replaceAll('<p1_Radio>', ProcessText);

    ProcessText(processedText);
    globalEditor.setCode(processedText);
}

/**
 * Use timeout before setting audio so that when constantly changing (e.g. when sliding) it doesn't continuosly process the text.
 */
let audioChangeTimeout;

export function setMasterVolume(volume, procInput) {
    if (!globalEditor) return;

    clearTimeout(audioChangeTimeout);

    // const code = globalEditor.code;
    const text = procInput.value;

    const comment = "// Master volume, controlled dynamically";

    if (!text.includes(comment)) {
        procInput.value += `\nall(x => x.gain(${volume})) ${comment}`;
    } else {
        const before = text.split(comment);
        const all = before[0].split("\n");
        // Concat line with existing value + comment, then use string replace to add new value.
        const line = `${all[all.length-1]?.trim()} ${comment}`;

        procInput.value = text.replace(line, `all(x => x.gain(${volume})) ${comment}`);
    }

    audioChangeTimeout = setTimeout(() => {
        // Process & play to update volume live.
        Proc(procInput);
        
        // Only play audio again if it was already playing before.
        if (globalEditor.audioPlaying) playAudio();
    }, 200);
}