import { ControlElementType } from '../../libs/enums/enums.js';
import { FormPayloadError } from '../../libs/exceptions/exceptions.js';
import { HTMLFormOperationalControlElement } from '../../libs/types/types.js';
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
	getRadioControlElementValue,
} from './libs/helpers/helpers.js';

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
		case ControlElementType.CHECKBOX: {
			return /** @type {T} */ (
				getCheckboxControlElementValue(
					/** @type {HTMLInputElement} */ (controlElement),
				)
			);
		}
		case ControlElementType.COLOR:
		case ControlElementType.HIDDEN:
		case ControlElementType.OUTPUT:
		case ControlElementType.PASSWORD:
		case ControlElementType.SEARCH:
		case ControlElementType.SELECT_ONE:
		case ControlElementType.TEL:
		case ControlElementType.TEXT:
		case ControlElementType.TEXTAREA:
		case ControlElementType.URL: {
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
		case ControlElementType.DATE:
		case ControlElementType.MONTH:
		case ControlElementType.TIME:
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
		case ControlElementType.EMAIL: {
			return /** @type {T} */ (
				getEmailControlElementValue(
					/** @type {HTMLInputElement} */ (controlElement),
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
		case ControlElementType.FILE: {
			return /** @type {T} */ (
				getFileControlElementValue(
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
		case ControlElementType.RADIO: {
			return /** @type {T} */ (
				getRadioControlElementValue(
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
	}

	throw new FormPayloadError({
		message: `Unsupported control element type – ${controlElement.type}.`,
	});
};

export { getFormControlElementsPayload } from './libs/helpers/helpers.js';
export { getFormControlPayload };
