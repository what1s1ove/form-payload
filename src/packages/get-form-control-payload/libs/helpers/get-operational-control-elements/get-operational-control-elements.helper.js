import {
	HTMLFormControlElement,
	HTMLFormOperationalControlElement,
} from '../../../../../libs/types/types.js';
import {
	checkHasControlElementName,
	checkIsAllowedControlElement,
	checkIsAllowedControlElementType,
} from './helpers/helpers.js';

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
		 * @param {HTMLFormControlElement} element
		 * @returns {element is HTMLFormOperationalControlElement}
		 */
		(element) => {
			return OPERATIONAL_CONTROL_ELEMENT_CHECKERS.every(
				(checkFunction) => {
					return checkFunction(element);
				},
			);
		},
	);
};

export { getOperationalControlElements };
