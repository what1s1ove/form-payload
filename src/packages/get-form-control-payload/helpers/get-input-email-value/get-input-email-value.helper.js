import { getFormControlValue } from '../get-control-value/get-control-value.helper.js';

const EMAIL_SEPARATOR = ',';

/**
 * @param {HTMLInputElement} inputNode
 * @returns {string | string[]}
 */
const getInputEmailValue = (inputNode) => {
	if (inputNode.multiple) {
		return inputNode.value
			.split(EMAIL_SEPARATOR)
			.map((email) => email.trim())
			.filter((email) => email !== '');
	}

	return getFormControlValue(inputNode);
};

export { getInputEmailValue };
