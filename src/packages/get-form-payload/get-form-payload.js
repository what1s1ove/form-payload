import { getFormControlsPayload } from '../get-form-control-payload/get-form-control-payload.js';

/** @typedef {import('../../libs/types/types.js').HTMLFormControlElement} HTMLFormControlElement */

/**
 * @template {Record<string, unknown>} T
 * @param {HTMLFormElement} formNode
 * @returns {T}
 */
const getFormPayload = (formNode) => {
	return getFormControlsPayload(
		/** @type {HTMLFormControlElement[]} */ ([...formNode.elements]),
	);
};

export { getFormPayload };
