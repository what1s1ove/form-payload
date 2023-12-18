import { VALUE_AS_ARRAY_IDENTIFIER } from '../../../../../libs/constants/constants.js';

/**
 * @param {HTMLInputElement} element
 * @returns {boolean | string[]}
 */
const getCheckboxControlElementValue = (element) => {
	const hasArrayValue = element.name.endsWith(VALUE_AS_ARRAY_IDENTIFIER);

	if (hasArrayValue) {
		return element.checked ? [element.value] : [];
	}

	return element.checked;
};

export { getCheckboxControlElementValue };
