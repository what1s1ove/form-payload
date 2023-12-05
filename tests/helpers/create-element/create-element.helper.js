/** @typedef {import('../../../src/common/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */

/**
 * @param {string} tagName
 * @param {Partial<HTMLElement | HTMLOptionElement | HTMLInputElement>} properties
 * @param {...(HTMLElement | string)} children
 * @returns {HTMLElement}
 */
const createElement = (tagName, properties, ...children) => {
	const element = document.createElement(tagName);

	if (properties) {
		Object.assign(element, properties);
	}

	for (const child of children) {
		element.append(child);
	}

	return element;
};

export { createElement };
