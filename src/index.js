import { getElementsValues, getControlValue } from './helpers/helpers.js';
import { FormPayloadError } from './exceptions/exceptions.js';
import { ControlType } from './common/enums/enums.js';

/** @typedef {import('./common/types/types.js').HTMLFormControlElement} HTMLFormControlElement */

/**
 * @template {Record<string, unknown>} T
 * @param {HTMLFormElement} formNode
 * @returns {T}
 */
const getFormValues = (formNode) => {
	return getElementsValues(
		/** @type {HTMLFormControlElement[]} */ (Array.from(formNode.elements)),
	);
};

export { ControlType, FormPayloadError, getControlValue, getFormValues };
