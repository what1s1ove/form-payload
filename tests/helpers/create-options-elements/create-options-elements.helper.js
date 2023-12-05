import { ElementName } from '../../../src/common/enums/enums.js';
import { createElement } from '../create-element/create-element.helper.js';

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
					value: opt,
					selected: isSelected,
				},
				opt,
			);
		})
	);
};

export { createOptionsElements };
