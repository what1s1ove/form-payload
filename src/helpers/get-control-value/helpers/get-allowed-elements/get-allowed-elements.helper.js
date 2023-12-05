import {
	BANNED_CONTROL_TYPES,
	BANNED_FORM_OPERATIONAL_CONTROL_ELEMENTS,
} from '../../../../common/constants/constants.js';

/** @typedef {import('../../../../common/types/types.js').HTMLFormControlElement} HTMLFormControlElement */
/** @typedef {import('../../../../common/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */

const checkControlFnMap = /** @type {const} */ ({
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
		const isBannedType = BANNED_CONTROL_TYPES.some((type) => {
			return type === element.type;
		});

		return !isBannedType;
	},
	/**
	 * @param {HTMLFormControlElement} element
	 * @returns {boolean}
	 */
	checkIsAllowedElement(element) {
		const isObjectNode = BANNED_FORM_OPERATIONAL_CONTROL_ELEMENTS.some(
			(node) => {
				return element instanceof node;
			},
		);

		return !isObjectNode;
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
			return Object.values(checkControlFnMap).every((checkFunction) => {
				return checkFunction(element);
			});
		},
	);
};

export { getAllowedElements };
