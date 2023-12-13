/** @typedef {import('../../../../../../libs/types/types.js').HTMLFormControlElement} HTMLFormControlElement */

/**
 * @param {HTMLFormControlElement} element
 * @returns {boolean}
 */
const checkHasControlElementName = (element) => {
	return Boolean(element.name);
};

export { checkHasControlElementName };
