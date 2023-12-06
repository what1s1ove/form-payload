/** @typedef {import('../../../../libs/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */

/**
 * @template {HTMLFormOperationalControlElement} T
 * @param {T} currentNode
 * @param {...T} checkNodes
 * @returns {boolean}
 */
const checkIsReferToAnotherNode = (currentNode, ...checkNodes) => {
	return checkNodes.some((checkNode) => {
		const hasElements = 'elements' in checkNode;

		if (!hasElements) {
			return false;
		}

		return Boolean(checkNode.elements.namedItem(currentNode.name));
	});
};

export { checkIsReferToAnotherNode };
