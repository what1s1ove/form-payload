/**
 * @param {HTMLSelectElement} selectNode
 * @returns {string[]}
 */
const getMultiSelectValues = (selectNode) => {
	return Array.from(selectNode.selectedOptions, (opt) => opt.value);
};

export { getMultiSelectValues };
