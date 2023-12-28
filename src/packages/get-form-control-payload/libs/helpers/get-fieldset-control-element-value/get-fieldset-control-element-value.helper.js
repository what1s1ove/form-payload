import { VALUE_AS_ARRAY_IDENTIFIER } from '../../../../../libs/constants/constants.js';
import { HTMLFormOperationalControlElement } from '../../../../../libs/types/types.js';
import { getFormControlElementsPayload } from '../get-form-control-elements-payload/get-form-control-elements-payload.js';

/**
 * @template {Record<string, unknown>} T
 * @param {(element: HTMLFormOperationalControlElement) => unknown} getFormControlElementPayloadCallback
 * @param {HTMLFieldSetElement} element
 * @returns {T | [T]}
 */
const getFieldsetControlElementValue = (
	getFormControlElementPayloadCallback,
	element,
) => {
	const fieldsetValue = getFormControlElementsPayload(
		getFormControlElementPayloadCallback,
		element.elements,
	);

	const hasArrayValue = element.name.endsWith(VALUE_AS_ARRAY_IDENTIFIER);

	return /** @type {T} */ (hasArrayValue ? [fieldsetValue] : fieldsetValue);
};

export { getFieldsetControlElementValue };
