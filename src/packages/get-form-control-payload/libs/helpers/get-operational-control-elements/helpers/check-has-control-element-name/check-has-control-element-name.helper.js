import { HTMLFormControlElement } from '../../../../../../../libs/types/types.js';

/**
 * @param {HTMLFormControlElement} element
 * @returns {boolean}
 */
const checkHasControlElementName = (element) => {
	return Boolean(element.name);
};

export { checkHasControlElementName };
