import {
	getFormControlPayload,
	getFormControlsPayload,
} from '../get-form-control-payload/get-form-control-payload.js';

/** @typedef {import('../../libs/types/types.js').HTMLFormControlElement} HTMLFormControlElement */

/**
 * @template {Record<string, unknown>} T
 * @param {HTMLFormElement} formNode
 * @returns {T}
 */
const getFormPayload = (formNode) => {
	const elements = /** @type {HTMLFormControlElement[]} */ ([
		...formNode.elements,
	]);

	return getFormControlsPayload(getFormControlPayload, ...elements);
};

export { getFormPayload };
