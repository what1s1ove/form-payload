import {
	VALUE_AS_ARRAY_CUSTOM_CONTROL_TYPES,
	VALUE_AS_ARRAY_IDENTIFIER,
} from '../../../../libs/constants/constants.js';

/** @typedef {import('../../../../libs/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */

/**
 * @param {HTMLFormOperationalControlElement} element
 * @returns {boolean}
 */
const checkHasValueAsArray = (element) => {
	return (
		element.name.endsWith(VALUE_AS_ARRAY_IDENTIFIER) &&
		/** @type {readonly string[]} */ (
			VALUE_AS_ARRAY_CUSTOM_CONTROL_TYPES
		).includes(element.type)
	);
};

export { checkHasValueAsArray };
