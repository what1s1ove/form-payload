import { VALUE_AS_ARRAY_IDENTIFIER } from '../../../../libs/constants/constants.js';

/** @typedef {import('../../../../libs/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */

/**
 * @param {HTMLFormOperationalControlElement} element
 * @returns {string}
 */
const getCleanedValueAsArrayControlName = (element) => {
	return element.name.replace(VALUE_AS_ARRAY_IDENTIFIER, '');
};

export { getCleanedValueAsArrayControlName };
