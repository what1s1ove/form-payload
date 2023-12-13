import { VALUE_AS_ARRAY_IDENTIFIER } from '../../../../libs/constants/constants.js';
import { getFormControlElementsPayload } from '../get-form-control-elements-payload/get-form-control-elements-payload.js';

/** @typedef {import('../../../../libs/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */
/** @typedef {import('../../../../libs/types/types.js').HTMLFormControlElement} HTMLFormControlElement */

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
	const elements = [.../** @type {HTMLFieldSetElement} */ (element).elements];
	const fieldsetValue = getFormControlElementsPayload(
		getFormControlElementPayloadCallback,
		.../** @type {HTMLFormControlElement[]} */ (elements),
	);

	const hasArrayValue = element.name.endsWith(VALUE_AS_ARRAY_IDENTIFIER);

	return /** @type {T} */ (hasArrayValue ? [fieldsetValue] : fieldsetValue);
};

export { getFieldsetControlElementValue };
