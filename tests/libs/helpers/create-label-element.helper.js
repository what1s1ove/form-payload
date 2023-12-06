import { ElementName } from '../../libs/enums/enums.js';
import { createElement } from './create-element.helper.js';

/**
 * @param {...(HTMLElement | string)} children
 * @returns {HTMLLabelElement}
 */
const createLabelElement = (...children) => {
	return /** @type {HTMLLabelElement} */ (
		createElement(ElementName.LABEL, {}, ...children)
	);
};

export { createLabelElement };
