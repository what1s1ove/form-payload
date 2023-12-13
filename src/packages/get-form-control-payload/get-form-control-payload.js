import { ControlElementType } from '../../libs/enums/enums.js';
import { FormPayloadError } from '../../libs/exceptions/exceptions.js';
import {
	getCheckboxControlElementValue,
	getControlElementValue,
	getDateControlElementValue,
	getDatetimeLocaControlElementValue,
	getEmailControlElementValue,
	getFieldsetControlElementValue,
	getFileControlElementValue,
	getMultiselectControlElementValue,
	getNumericControlElementValue,
} from './helpers/helpers.js';

/** @typedef {import('../../libs/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */

/**
 * @template {unknown} T
 * @param {HTMLFormOperationalControlElement} controlElement
 * @returns {T}
 * @throws {FormPayloadError}
 */
const getFormControlPayload = (controlElement) => {
	const hasType = 'type' in controlElement;

	if (!hasType) {
		throw new FormPayloadError({
			message: 'Control element has no type attribute.',
		});
	}

	switch (controlElement.type) {
		case ControlElementType.TEXT:
		case ControlElementType.PASSWORD:
		case ControlElementType.SEARCH:
		case ControlElementType.URL:
		case ControlElementType.TEL:
		case ControlElementType.COLOR:
		case ControlElementType.RADIO:
		case ControlElementType.HIDDEN:
		case ControlElementType.TEXTAREA:
		case ControlElementType.SELECT_ONE:
		case ControlElementType.OUTPUT: {
			return /** @type {T} */ (
				getControlElementValue(
					/**
					 * @type {HTMLInputElement
					 * 	| HTMLOutputElement
					 * 	| HTMLTextAreaElement
					 * 	| HTMLSelectElement}
					 */ (controlElement),
				)
			);
		}
		case ControlElementType.EMAIL: {
			return /** @type {T} */ (
				getEmailControlElementValue(
					/** @type {HTMLInputElement} */ (controlElement),
				)
			);
		}
		case ControlElementType.NUMBER:
		case ControlElementType.RANGE: {
			return /** @type {T} */ (
				getNumericControlElementValue(
					/** @type {HTMLInputElement} */ (controlElement),
				)
			);
		}
		case ControlElementType.CHECKBOX: {
			return /** @type {T} */ (
				getCheckboxControlElementValue(
					/** @type {HTMLInputElement} */ (controlElement),
				)
			);
		}
		case ControlElementType.DATE:
		case ControlElementType.TIME:
		case ControlElementType.MONTH:
		case ControlElementType.WEEK: {
			return /** @type {T} */ (
				getDateControlElementValue(
					/** @type {HTMLInputElement} */ (controlElement),
				)
			);
		}
		case ControlElementType.DATETIME_LOCAL: {
			return /** @type {T} */ (
				getDatetimeLocaControlElementValue(
					/** @type {HTMLInputElement} */ (controlElement),
				)
			);
		}
		case ControlElementType.FILE: {
			return /** @type {T} */ (
				getFileControlElementValue(
					/** @type {HTMLInputElement} */ (controlElement),
				)
			);
		}
		case ControlElementType.SELECT_MULTIPLE: {
			return /** @type {T} */ (
				getMultiselectControlElementValue(
					/** @type {HTMLSelectElement} */ (controlElement),
				)
			);
		}
		case ControlElementType.FIELDSET: {
			return /** @type {T} */ (
				getFieldsetControlElementValue(
					getFormControlPayload,
					/** @type {HTMLFieldSetElement} */ (controlElement),
				)
			);
		}
	}

	throw new FormPayloadError({
		message: `Unsupported control element type – ${controlElement.type}.`,
	});
};

export { getFormControlElementsPayload } from './helpers/helpers.js';
export { getFormControlPayload };
