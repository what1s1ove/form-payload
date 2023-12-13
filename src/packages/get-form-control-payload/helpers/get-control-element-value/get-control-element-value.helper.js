/**
 * @param {HTMLInputElement
 * 	| HTMLOutputElement
 * 	| HTMLTextAreaElement
 * 	| HTMLSelectElement} element
 * @returns {string}
 */
const getControlElementValue = (element) => {
	return element.value;
};

export { getControlElementValue };
