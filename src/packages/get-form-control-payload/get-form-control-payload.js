import { ControlType } from '../../libs/enums/enums.js';
import { FormPayloadError } from '../../libs/exceptions/exceptions.js';
import {
	checkIsReferToAnotherNode,
	getAllowedElements,
	getCheckboxValue,
	getDatetimeLocalValue,
	getFormControlValue,
	getInputDateValue,
	getInputEmailValue,
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
 * @template {unknown} T
 * @param {HTMLFormOperationalControlElement} controlNode
 * @returns {T}
 * @throws {FormPayloadError}
 */
const getFormControlPayload = (controlNode) => {
	const hasType = 'type' in controlNode;

	if (!hasType) {
		throw new FormPayloadError({
			message: 'Control element has no type attribute.',
		});
	}

	switch (controlNode.type) {
		case ControlType.TEXT:
		case ControlType.PASSWORD:
		case ControlType.SEARCH:
		case ControlType.URL:
		case ControlType.TEL:
		case ControlType.COLOR:
		case ControlType.RADIO:
		case ControlType.HIDDEN:
		case ControlType.TEXTAREA:
		case ControlType.SELECT_ONE:
		case ControlType.OUTPUT: {
			return /** @type {T} */ (
				getFormControlValue(
					/**
					 * @type {HTMLInputElement
					 * 	| HTMLOutputElement
					 * 	| HTMLTextAreaElement
					 * 	| HTMLSelectElement}
					 */ (controlNode),
				)
			);
		}
		case ControlType.EMAIL: {
			return /** @type {T} */ (
				getInputEmailValue(
					/** @type {HTMLInputElement} */ (controlNode),
				)
			);
		}
		case ControlType.NUMBER:
		case ControlType.RANGE: {
			return /** @type {T} */ (
				getInputNumericValue(
					/** @type {HTMLInputElement} */ (controlNode),
				)
			);
		}
		case ControlType.CHECKBOX: {
			return /** @type {T} */ (
				getCheckboxValue(/** @type {HTMLInputElement} */ (controlNode))
			);
		}
		case ControlType.DATE:
		case ControlType.TIME:
		case ControlType.MONTH:
		case ControlType.WEEK: {
			return /** @type {T} */ (
				getInputDateValue(/** @type {HTMLInputElement} */ (controlNode))
			);
		}
		case ControlType.DATETIME_LOCAL: {
			return /** @type {T} */ (
				getDatetimeLocalValue(
					/** @type {HTMLInputElement} */ (controlNode),
				)
			);
		}
		case ControlType.FILE: {
			return /** @type {T} */ (
				getInputFileValue(/** @type {HTMLInputElement} */ (controlNode))
			);
		}
		case ControlType.SELECT_MULTIPLE: {
			return /** @type {T} */ (
				getMultiSelectValues(
					/** @type {HTMLSelectElement} */ (controlNode),
				)
			);
		}
		case ControlType.FIELDSET: {
			const elements = [
				.../** @type {HTMLFieldSetElement} */ (controlNode).elements,
			];

			return /** @type {T} */ (
				getFormControlsPayload(
					.../** @type {HTMLFormControlElement[]} */ (elements),
				)
			);
		}
	}

	throw new FormPayloadError({
		message: `Unsupported control element type – ${controlNode.type}.`,
	});
};

export { getFormControlPayload, getFormControlsPayload };
