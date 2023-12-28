import { VALUE_AS_ARRAY_IDENTIFIER } from '../../../../../libs/constants/constants.js';
import { HTMLFormOperationalControlElement } from '../../../../../libs/types/types.js';

/**
 * @param {HTMLFormOperationalControlElement} element
 * @returns {string}
 */
const normalizeValueAsArrayControlElementName = (element) => {
	return element.name.replace(VALUE_AS_ARRAY_IDENTIFIER, '');
};

export { normalizeValueAsArrayControlElementName };
