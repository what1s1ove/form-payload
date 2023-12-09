/** @typedef {import('../../../../libs/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */

/**
 * @template {HTMLFormOperationalControlElement} T
 * @param {T} currentNode
 * @param {...T} checkNodes
 * @returns {boolean}
 */
const checkIsReferToAnotherNode = (currentNode, ...checkNodes) => {
	return checkNodes.some((checkNode) => {
		const hasElements =
			'elements' in checkNode && checkNode.elements.length > 0;

		if (!hasElements) {
			return false;
		}

		return [...checkNode.elements].some((element) =>
			element.contains(currentNode),
		);
	});
};

export { checkIsReferToAnotherNode };
