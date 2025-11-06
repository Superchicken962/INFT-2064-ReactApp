/**
 * Removes class from all elements given a selector.
 * 
 * @param { String } selector - Query selector.
 * @param { String } classToRemove - Classname to remove from all found elements.
 */
export function removeClassFromAll(selector, classToRemove) {
    for (const el of document.querySelectorAll(selector)) {
        el.classList.remove(classToRemove);
    }
}