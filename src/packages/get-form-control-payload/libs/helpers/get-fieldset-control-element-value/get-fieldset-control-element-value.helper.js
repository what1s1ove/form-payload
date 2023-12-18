import { VALUE_AS_ARRAY_IDENTIFIER } from '../../../../../libs/constants/constants.js';
import { getFormControlElementsPayload } from '../get-form-control-elements-payload/get-form-control-elements-payload.js';

/** @typedef {import('../../../../../libs/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */

/**
 * @template {Record<string, unknown>} T
 * @param {<T extends unknown>(
 * 	element: HTMLFormOperationalControlElement,
 * ) => T} getFormControlElementPayloadCallback
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
