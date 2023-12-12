import { checkHasValueAsArray } from '../check-has-value-as-array/check-has-value-as-array.helper.js';
import { checkIsReferToAnotherNode } from '../check-is-refer-to-another-node/check-is-refer-to-another-node.helper.js';
import { getAllowedElements } from '../get-allowed-elements/get-allowed-elements.helper.js';
import { getCleanedValueAsArrayControlName } from '../get-cleaned-value-as-array-control-name/get-cleaned-value-as-array-control-name.helper.js';

/** @typedef {import('../../../../libs/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */
/** @typedef {import('../../../../libs/types/types.js').HTMLFormControlElement} HTMLFormControlElement */

/**
 * @template {Record<string, unknown>} T
 * @param {<T extends unknown>(
 * 	element: HTMLFormOperationalControlElement,
 * ) => T} getFormControlPayloadCallback
 * @param {...HTMLFormControlElement} controlElements
 * @returns {T}
 */
const getFormControlsPayload = (
	getFormControlPayloadCallback,
	...controlElements
) => {
	const allowedElements = getAllowedElements(controlElements);

	const elementsValues = /** @type {T} */ ({});

	for (const element of allowedElements) {
		const isReferToAnotherNode = checkIsReferToAnotherNode(
			element,
			allowedElements,
		);

		if (isReferToAnotherNode) {
			continue;
		}

		const hasValueAsArray = checkHasValueAsArray(element);

		if (hasValueAsArray) {
			const key = /** @type {keyof T} */ (
				getCleanedValueAsArrayControlName(element)
			);
			const value = /** @type {T[keyof T]} */ ([
				.../** @type {unknown[]} */ (elementsValues[key] ?? []),
				.../** @type {unknown[]} */ (
					getFormControlPayloadCallback(element)
				),
			]);

			elementsValues[key] = value;

			continue;
		}

		const key = /** @type {keyof T} */ (element.name);
		const value = /** @type {T[keyof T]} */ (
			getFormControlPayloadCallback(element)
		);

		elementsValues[key] = value;
	}

	return elementsValues;
};

export { getFormControlsPayload };
