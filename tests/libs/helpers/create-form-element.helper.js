import { ElementName } from '../../libs/enums/enums.js';
import { createElement } from './create-element.helper.js';

/**
 * @param {...(HTMLElement | string)} children
 * @returns {HTMLFormElement}
 */
const createFormElement = (...children) => {
	return /** @type {HTMLFormElement} */ (
		createElement(
			ElementName.FORM,
			{
				name: '',
			},
			...children,
		)
	);
};

export { createFormElement };