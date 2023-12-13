import { getControlElementValue } from '../get-control-element-value/get-control-element-value.helper.js';

const EMAIL_SEPARATOR = ',';

/**
 * @param {HTMLInputElement} element
 * @returns {string | string[]}
 */
const getEmailControlElementValue = (element) => {
	if (element.multiple) {
		return element.value
			.split(EMAIL_SEPARATOR)
			.map((email) => email.trim())
			.filter((email) => email !== '');
	}

	return getControlElementValue(element);
};

export { getEmailControlElementValue };
