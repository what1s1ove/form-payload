import { bannedElementNameToElementInstance } from '../../../../../../libs/maps/maps.js';

/** @typedef {import('../../../../../../libs/types/types.js').HTMLFormControlElement} HTMLFormControlElement */

/**
 * @param {HTMLFormControlElement} element
 * @returns {boolean}
 */
const checkIsAllowedControlElement = (element) => {
	const isSameElement = Object.values(
		bannedElementNameToElementInstance,
	).some((elementInstance) => {
		return element instanceof elementInstance;
	});

	return !isSameElement;
};

export { checkIsAllowedControlElement };
