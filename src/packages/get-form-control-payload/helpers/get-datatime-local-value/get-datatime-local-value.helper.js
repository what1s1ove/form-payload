/**
 * @param {HTMLInputElement} element
 * @returns {Date}
 */
const getDatetimeLocalValue = (element) => {
	return new Date(element.value);
};

export { getDatetimeLocalValue };
