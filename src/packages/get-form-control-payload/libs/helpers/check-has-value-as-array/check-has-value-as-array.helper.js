import {
	VALUE_AS_ARRAY_CUSTOM_CONTROL_ELEMENT_TYPES,
	VALUE_AS_ARRAY_IDENTIFIER,
} from '../../../../../libs/constants/constants.js';
import { HTMLFormOperationalControlElement } from '../../../../../libs/types/types.js';

/**
 * @param {HTMLFormOperationalControlElement} element
 * @returns {boolean}
 */
const checkHasValueAsArray = (element) => {
	const hasValueAsArrayIdentifier = element.name.endsWith(
		VALUE_AS_ARRAY_IDENTIFIER,
	);
	const isValueAsArrayCustomControlElementType =
		/** @type {readonly string[]} */ (
			VALUE_AS_ARRAY_CUSTOM_CONTROL_ELEMENT_TYPES
		).includes(element.type);

	return hasValueAsArrayIdentifier && isValueAsArrayCustomControlElementType;
};

export { checkHasValueAsArray };
