import { ControlType } from '../../libs/enums/enums.js';
import { FormPayloadError } from '../../libs/exceptions/exceptions.js';
import {
	checkIsReferToAnotherNode,
	getAllowedElements,
	getInputFileValue,
	getMultiSelectValues,
} from './helpers/helpers.js';

/** @typedef {import('../../libs/types/types.js').HTMLFormControlElement} HTMLFormControlElement */
/** @typedef {import('../../libs/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */

/**
 * @template {Record<string, unknown>} T
 * @param {HTMLFormControlElement[]} controlElements
 * @returns {T}
 */
const getFormControlsPayload = (controlElements) => {
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
		case ControlType.COLOR:
		case ControlType.EMAIL:
		case ControlType.HIDDEN:
		case ControlType.PASSWORD:
		case ControlType.RADIO:
		case ControlType.SEARCH:
		case ControlType.TEL:
		case ControlType.TEXT:
		case ControlType.URL:
		case ControlType.OUTPUT:
		case ControlType.TEXTAREA:
		case ControlType.SELECT_ONE: {
			/**
			 * @typedef {HTMLInputElement
			 * 	| HTMLOutputElement
			 * 	| HTMLTextAreaElement
			 * 	| HTMLSelectElement} SpecifiedControlNode
			 */
			const specifiedControlNode = /** @type {SpecifiedControlNode} */ (
				controlNode
			);

			return specifiedControlNode.value;
		}
		case ControlType.DATE:
		case ControlType.DATETIME_LOCAL:
		case ControlType.MONTH:
		case ControlType.TIME:
		case ControlType.WEEK: {
			const specifiedControlNode = /** @type {HTMLInputElement} */ (
				controlNode
			);

			return specifiedControlNode.valueAsDate;
		}
		case ControlType.NUMBER:
		case ControlType.RANGE: {
			const specifiedControlNode = /** @type {HTMLInputElement} */ (
				controlNode
			);
			return specifiedControlNode.valueAsNumber;
		}
		case ControlType.CHECKBOX: {
			const specifiedControlNode = /** @type {HTMLInputElement} */ (
				controlNode
			);

			return specifiedControlNode.checked;
		}
		case ControlType.SELECT_MULTIPLE: {
			const specifiedControlNode = /** @type {HTMLSelectElement} */ (
				controlNode
			);

			return getMultiSelectValues(specifiedControlNode);
		}
		case ControlType.FILE: {
			const specifiedControlNode = /** @type {HTMLInputElement} */ (
				controlNode
			);

			return getInputFileValue(specifiedControlNode);
		}
		case ControlType.FIELDSET: {
			const specifiedControlNode = /** @type {HTMLFieldSetElement} */ (
				controlNode
			);

			return getFormControlsPayload(
				/** @type {HTMLFormControlElement[]} */ ([
					...specifiedControlNode.elements,
				]),
			);
		}
	}

	throw new FormPayloadError({
		message: 'Unknown control type.',
	});
};

export { getFormControlPayload, getFormControlsPayload };
