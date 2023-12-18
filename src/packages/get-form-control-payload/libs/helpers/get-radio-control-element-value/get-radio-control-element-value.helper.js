const UNCHECKED_RADIO_CONTROL_ELEMENT_VALUE = /** @type {const} */ ('');

/**
 * @param {HTMLInputElement} element
 * @returns {string}
 */
const getRadioControlElementValue = (element) => {
	return element.checked
		? element.value
		: UNCHECKED_RADIO_CONTROL_ELEMENT_VALUE;
};

export { getRadioControlElementValue };
