import { BANNED_CONTROL_TYPES } from '../../../../libs/constants/constants.js';
import { bannedElementNameToElementInstance } from '../../../../libs/maps/maps.js';

/** @typedef {import('../../../../libs/types/types.js').HTMLFormControlElement} HTMLFormControlElement */
/** @typedef {import('../../../../libs/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */

const checkControlFunctionMap = /** @type {const} */ ({
	/**
	 * @param {HTMLFormControlElement} element
	 * @returns {boolean}
	 */
	checkHasControlName(element) {
		return Boolean(element.name);
	},
	/**
	 * @param {HTMLFormControlElement} element
	 * @returns {boolean}
	 */
	checkIsAllowedControl(element) {
		const isBannedType = /** @type {readonly string[]} */ (
			BANNED_CONTROL_TYPES
		).includes(element.type);

		return !isBannedType;
	},
	/**
	 * @param {HTMLFormControlElement} element
	 * @returns {boolean}
	 */
	checkIsAllowedElement(element) {
		const isSameNode = Object.values(
			bannedElementNameToElementInstance,
		).some((node) => {
			return element instanceof node;
		});

		return !isSameNode;
	},
});

/**
 * @param {HTMLFormControlElement[]} elements
 * @returns {HTMLFormOperationalControlElement[]}
 */
const getAllowedElements = (elements) => {
	return elements.filter(
		/**
		 * @type {(
		 * 	element: HTMLFormControlElement,
		 * ) => element is HTMLFormOperationalControlElement}
		 */ (element) => {
			return Object.values(checkControlFunctionMap).every(
				(checkFunction) => {
					return checkFunction(element);
				},
			);
		},
	);
};

export { getAllowedElements };
