import {
	checkHasControlElementName,
	checkIsAllowedControlElement,
	checkIsAllowedControlElementType,
} from './helpers/helpers.js';

/** @typedef {import('../../../../../libs/types/types.js').HTMLFormControlElement} HTMLFormControlElement */
/** @typedef {import('../../../../../libs/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */

const OPERATIONAL_CONTROL_ELEMENT_CHECKERS = /** @type {const} */ ([
	checkHasControlElementName,
	checkIsAllowedControlElement,
	checkIsAllowedControlElementType,
]);

/**
 * @param {HTMLFormControlElement[]} elements
 * @returns {HTMLFormOperationalControlElement[]}
 */
const getOperationalControlElements = (elements) => {
	return elements.filter(
		/**
		 * @type {(
		 * 	element: HTMLFormControlElement,
		 * ) => element is HTMLFormOperationalControlElement}
		 */ (element) => {
			return Object.values(OPERATIONAL_CONTROL_ELEMENT_CHECKERS).every(
				(checkFunction) => {
					return checkFunction(element);
				},
			);
		},
	);
};

export { getOperationalControlElements };
