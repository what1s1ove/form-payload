/**
 * @param {HTMLInputElement} element
 * @returns {Date | null}
 */
const getDateControlElementValue = (element) => {
	return element.valueAsDate;
};

export { getDateControlElementValue };
