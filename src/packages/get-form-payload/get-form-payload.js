import {
	getFormControlElementsPayload,
	getFormControlPayload,
} from '../get-form-control-payload/get-form-control-payload.js';

/**
 * @template {Record<string, unknown>} T
 * @param {HTMLFormElement} formElement
 * @returns {T}
 */
const getFormPayload = (formElement) => {
	return getFormControlElementsPayload(
		getFormControlPayload,
		formElement.elements,
	);
};

export { getFormPayload };
