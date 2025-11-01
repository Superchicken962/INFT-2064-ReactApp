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