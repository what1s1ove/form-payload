import { getElementsValues } from './helpers/helpers.js';

/** @typedef {import('./common/types/types.js').HTMLFormControlElement} HTMLFormControlElement */

/**
 * @template {Record<string, unknown>} T
 * @param {HTMLFormElement} formNode
 * @returns {T}
 */
const getFormValues = (formNode) => {
	return getElementsValues(
		/** @type {HTMLFormControlElement[]} */ ([...formNode.elements]),
	);
};

export { getFormValues };
export { getControlValue } from './helpers/helpers.js';
export { FormPayloadError } from './exceptions/exceptions.js';
export { ControlType } from './common/enums/enums.js';
