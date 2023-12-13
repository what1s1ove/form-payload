import { BANNED_CONTROL_ELEMENT_TYPES } from '../../../../../../libs/constants/constants.js';

/** @typedef {import('../../../../../../libs/types/types.js').HTMLFormControlElement} HTMLFormControlElement */

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
