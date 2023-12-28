import { bannedElementNameToElementInstance } from '../../../../../../../libs/maps/maps.js';
import { HTMLFormControlElement } from '../../../../../../../libs/types/types.js';

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
