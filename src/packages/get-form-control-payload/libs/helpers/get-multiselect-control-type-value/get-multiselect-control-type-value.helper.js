/**
 * @param {HTMLSelectElement} element
 * @returns {string[]}
 */
const getMultiselectControlElementValue = (element) => {
	return Array.from(element.selectedOptions, (opt) => opt.value);
};

export { getMultiselectControlElementValue };
