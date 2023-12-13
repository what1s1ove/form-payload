import { checkHasValueAsArray } from '../check-has-value-as-array/check-has-value-as-array.helper.js';
import { checkIsReferToAnotherElement } from '../check-is-refer-to-another-element/check-is-refer-to-another-element.helper.js';
import { getOperationalControlElements } from '../get-operational-control-elements/get-operational-control-elements.helper.js';
import { normalizeValueAsArrayControlElementName } from '../normalize-value-as-array-control-element-name/normalize-value-as-array-control-element-name.helper.js';

/** @typedef {import('../../../../libs/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */
/** @typedef {import('../../../../libs/types/types.js').HTMLFormControlElement} HTMLFormControlElement */

/**
 * @template {Record<string, unknown>} T
 * @param {<T extends unknown>(
 * 	element: HTMLFormOperationalControlElement,
 * ) => T} getFormControlElementPayloadCallback
 * @param {...HTMLFormControlElement} controlElements
 * @returns {T}
 */
const getFormControlElementsPayload = (
	getFormControlElementPayloadCallback,
	...controlElements
) => {
	const operationalControlElements =
		getOperationalControlElements(controlElements);

	const elementsValues = /** @type {T} */ ({});

	for (const operationalControlElement of operationalControlElements) {
		const isReferToAnotherElement = checkIsReferToAnotherElement(
			operationalControlElement,
			operationalControlElements,
		);

		if (isReferToAnotherElement) {
			continue;
		}

		const hasValueAsArray = checkHasValueAsArray(operationalControlElement);

		if (hasValueAsArray) {
			const key = /** @type {keyof T} */ (
				normalizeValueAsArrayControlElementName(
					operationalControlElement,
				)
			);
			const value = /** @type {T[keyof T]} */ ([
				.../** @type {unknown[]} */ (elementsValues[key] ?? []),
				.../** @type {unknown[]} */ (
					getFormControlElementPayloadCallback(
						operationalControlElement,
					)
				),
			]);

			elementsValues[key] = value;

			continue;
		}

		const key = /** @type {keyof T} */ (operationalControlElement.name);
		const value = /** @type {T[keyof T]} */ (
			getFormControlElementPayloadCallback(operationalControlElement)
		);

		elementsValues[key] = value;
	}

	return elementsValues;
};

export { getFormControlElementsPayload };
