import { VALUE_AS_ARRAY_IDENTIFIER } from '../../../../libs/constants/constants.js';
import { getFormControlsPayload } from '../get-form-controls-payload/get-form-controls-payload.js';

/** @typedef {import('../../../../libs/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */
/** @typedef {import('../../../../libs/types/types.js').HTMLFormControlElement} HTMLFormControlElement */

/**
 * @template {Record<string, unknown>} T
 * @param {<T extends unknown>(
 * 	element: HTMLFormOperationalControlElement,
 * ) => T} getFormControlPayloadCallback
 * @param {HTMLFieldSetElement} element
 * @returns {T | [T]}
 */
const getFieldsetValue = (getFormControlPayloadCallback, element) => {
	const elements = [.../** @type {HTMLFieldSetElement} */ (element).elements];
	const fieldsetValue = getFormControlsPayload(
		getFormControlPayloadCallback,
		.../** @type {HTMLFormControlElement[]} */ (elements),
	);

	const hasArrayValue = element.name.endsWith(VALUE_AS_ARRAY_IDENTIFIER);

	return /** @type {T} */ (hasArrayValue ? [fieldsetValue] : fieldsetValue);
};

export { getFieldsetValue };
