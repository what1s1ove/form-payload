import {
	getFormControlElementsPayload,
	getFormControlPayload,
} from '../get-form-control-payload/get-form-control-payload.js';

/** @typedef {import('../../libs/types/types.js').HTMLFormControlElement} HTMLFormControlElement */

/**
 * @template {Record<string, unknown>} T
 * @param {HTMLFormElement} formElement
 * @returns {T}
 */
const getFormPayload = (formElement) => {
	const elements = /** @type {HTMLFormControlElement[]} */ ([
		...formElement.elements,
	]);

	return getFormControlElementsPayload(getFormControlPayload, ...elements);
};

export { getFormPayload };
