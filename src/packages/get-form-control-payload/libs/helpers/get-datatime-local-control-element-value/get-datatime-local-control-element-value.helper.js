/**
 * @param {HTMLInputElement} element
 * @returns {Date}
 */
const getDatetimeLocaControlElementValue = (element) => {
	return new Date(element.value);
};

export { getDatetimeLocaControlElementValue };
