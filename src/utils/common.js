// General / common utility functions

/**
 * Generates a random code using letters, numbers and a few special characters.
 * 
 * @param { Number } length - Desired length for code.
 */
export function generateRandomCode(length = 12) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCEDGFHIJKLMNOPRQSTUVXZWY0123456789!@#$%";
    let code = "";

    for (let i = 0; i < length; i++) {
        const randChar = chars[Math.floor(Math.random() * chars.length)];
        code += randChar;
    }

    return code;
}

/**
 * Creates a file input and clicks it to prompt the user to upload a file.
 * 
 * @param { String } accepts - File types to accept. (e.g. '.json')
 * @param { (fileName: string, content: string) => {} } onUpload - Callback when file is uploaded.
 * @param { (e: ProgressEvent<FileReader>) => void } onError - Callback if error occurs.
 */
export function getFileInput(accepts, onUpload, onError) {
    // Create file input, then click and handle file upload.
    const hiddenInp = document.createElement("input");
    hiddenInp.setAttribute("type", "file");
    hiddenInp.setAttribute("accept", accepts);

    hiddenInp.addEventListener("input", (ev) => {
        const file = ev.target.files[0];
        if (!file) return;

        const fReader = new FileReader();

        fReader.onload = (e) => {
            onUpload?.(file.name, e.target.result);
        }

        fReader.onerror = (e) => {
            onError?.(e);
        }

        fReader.readAsText(file);
    });

    hiddenInp.click();
    hiddenInp.remove();
}