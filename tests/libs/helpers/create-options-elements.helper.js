import { ElementName } from '../../libs/enums/enums.js';
import { createElement } from './create-element.helper.js';

/**
 * @param {string[]} options
 * @param {...string} selectedOptions
 * @returns {HTMLOptionElement[]}
 */
const createOptionsElements = (options, ...selectedOptions) => {
	return /** @type {HTMLOptionElement[]} */ (
		options.map((opt) => {
			const isSelected = selectedOptions.includes(opt);

			return createElement(
				ElementName.OPTION,
				{
					selected: isSelected,
					value: opt,
				},
				opt,
			);
		})
	);
};

export { createOptionsElements };