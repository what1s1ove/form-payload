/**
 * @param {HTMLInputElement
 * 	| HTMLOutputElement
 * 	| HTMLTextAreaElement
 * 	| HTMLSelectElement} element
 * @returns {string}
 */
const getFormControlValue = (element) => {
	return element.value;
};

export { getFormControlValue };
