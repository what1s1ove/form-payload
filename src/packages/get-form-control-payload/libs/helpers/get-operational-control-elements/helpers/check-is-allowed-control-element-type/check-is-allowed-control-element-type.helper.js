import { BANNED_CONTROL_ELEMENT_TYPES } from '../../../../../../../libs/constants/constants.js';
import { HTMLFormControlElement } from '../../../../../../../libs/types/types.js';

/**
 * @param {HTMLFormControlElement} element
 * @returns {boolean}
 */
const checkIsAllowedControlElementType = (element) => {
	const isBannedType = /** @type {readonly string[]} */ (
		BANNED_CONTROL_ELEMENT_TYPES
	).includes(element.type);

	return !isBannedType;
};

export { checkIsAllowedControlElementType };
