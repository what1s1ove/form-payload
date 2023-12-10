import { ControlType } from '../../libs/enums/enums.js';
import { FormPayloadError } from '../../libs/exceptions/exceptions.js';
import {
	checkIsReferToAnotherNode,
	getAllowedElements,
	getCheckboxValue,
	getDatetimeLocalValue,
	getFormControlValue,
	getInputDateValue,
	getInputFileValue,
	getInputNumericValue,
	getMultiSelectValues,
} from './helpers/helpers.js';

/** @typedef {import('../../libs/types/types.js').HTMLFormControlElement} HTMLFormControlElement */
/** @typedef {import('../../libs/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */

/**
 * @template {Record<string, unknown>} T
 * @param {...HTMLFormControlElement} controlElements
 * @returns {T}
 */
const getFormControlsPayload = (...controlElements) => {
	const allowedElements = getAllowedElements(controlElements);

	let elementsValues = /** @type {T} */ ({});

	for (const element of allowedElements) {
		const isReferToAnotherNode = checkIsReferToAnotherNode(
			element,
			...allowedElements,
		);

		if (isReferToAnotherNode) {
			continue;
		}

		elementsValues = {
			...elementsValues,
			[element.name]: getFormControlPayload(element),
		};
	}

	return elementsValues;
};

/**
 * @param {HTMLFormOperationalControlElement} controlNode
 * @returns {unknown}
 * @throws {FormPayloadError}
 */
const getFormControlPayload = (controlNode) => {
	switch (controlNode.type) {
		case ControlType.TEXT:
		case ControlType.PASSWORD:
		case ControlType.EMAIL:
		case ControlType.SEARCH:
		case ControlType.URL:
		case ControlType.TEL:
		case ControlType.COLOR:
		case ControlType.RADIO:
		case ControlType.HIDDEN:
		case ControlType.TEXTAREA:
		case ControlType.SELECT_ONE:
		case ControlType.OUTPUT: {
			return getFormControlValue(
				/**
				 * @type {HTMLInputElement
				 * 	| HTMLOutputElement
				 * 	| HTMLTextAreaElement
				 * 	| HTMLSelectElement}
				 */ (controlNode),
			);
		}
		case ControlType.NUMBER:
		case ControlType.RANGE: {
			return getInputNumericValue(
				/** @type {HTMLInputElement} */ (controlNode),
			);
		}
		case ControlType.CHECKBOX: {
			return getCheckboxValue(
				/** @type {HTMLInputElement} */ (controlNode),
			);
		}
		case ControlType.DATE:
		case ControlType.TIME:
		case ControlType.MONTH:
		case ControlType.WEEK: {
			return getInputDateValue(
				/** @type {HTMLInputElement} */ (controlNode),
			);
		}
		case ControlType.DATETIME_LOCAL: {
			return getDatetimeLocalValue(
				/** @type {HTMLInputElement} */ (controlNode),
			);
		}
		case ControlType.FILE: {
			return getInputFileValue(
				/** @type {HTMLInputElement} */ (controlNode),
			);
		}
		case ControlType.SELECT_MULTIPLE: {
			return getMultiSelectValues(
				/** @type {HTMLSelectElement} */ (controlNode),
			);
		}
		case ControlType.FIELDSET: {
			const elements = [
				.../** @type {HTMLFieldSetElement} */ (controlNode).elements,
			];

			return getFormControlsPayload(
				.../** @type {HTMLFormControlElement[]} */ (elements),
			);
		}
	}

	throw new FormPayloadError({
		message: `Unsupported control type – ${controlNode.type}.`,
	});
};

export { getFormControlPayload, getFormControlsPayload };
