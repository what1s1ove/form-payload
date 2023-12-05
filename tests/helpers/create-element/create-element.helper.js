/** @typedef {import('../../../src/common/types/types.js').HTMLFormOperationalControlElement} HTMLFormOperationalControlElement */

/**
 * @param {string} tagName
 * @param {Partial<HTMLElement | HTMLOptionElement | HTMLInputElement>} props
 * @param {...(HTMLElement | string)} children
 * @returns {HTMLElement}
 */
const createElement = (tagName, props, ...children) => {
	const element = document.createElement(tagName);

	if (props) {
		Object.assign(element, props);
	}

	children.forEach((child) => element.append(child));

	return element;
};

export { createElement };
