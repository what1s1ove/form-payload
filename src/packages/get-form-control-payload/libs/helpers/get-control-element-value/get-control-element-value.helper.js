/**
 * @param {HTMLInputElement
 * 	| HTMLOutputElement
 * 	| HTMLTextAreaElement
 * 	| HTMLSelectElement
 * 	| RadioNodeList} element
 * @returns {string}
 */
const getControlElementValue = (element) => {
	return element.value;
};

export { getControlElementValue };
