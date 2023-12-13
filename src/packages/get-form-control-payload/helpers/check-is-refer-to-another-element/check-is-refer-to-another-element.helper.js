/** @typedef {import('../../../../libs/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */

/**
 * @param {HTMLFormOperationalControlElement} currentElement
 * @param {HTMLFormOperationalControlElement[]} checkedElements
 * @returns {boolean}
 */
const checkIsReferToAnotherElement = (currentElement, checkedElements) => {
	return checkedElements.some((checkedElement) => {
		const hasElements =
			'elements' in checkedElement && checkedElement.elements.length > 0;

		if (!hasElements) {
			return false;
		}

		return [...checkedElement.elements].some((element) =>
			element.contains(currentElement),
		);
	});
};

export { checkIsReferToAnotherElement };
