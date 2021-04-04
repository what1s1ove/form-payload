import { screen } from '@testing-library/dom';
import { ElementName } from '~/common/enums';
import { createElement } from '~/helpers';
import { getControlValue } from '~/index';
import { createLabelElement, createOptionsElements } from './utils';

describe('getFormValues should work correctly', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('getFormValues should work correctly with select', () => {
    const SELECT_LABEL = 'Colors' as const;

    const Color = {
      RED: 'red',
      BLUE: 'blue',
      YELLOW: 'yellow',
    } as const;

    const options = Object.values(Color);

    test('should get value from select correctly', () => {
      const selectedValue = Color.RED;
      const selectOptions = createOptionsElements(options, selectedValue);

      document.body.append(
        createLabelElement(
          SELECT_LABEL,
          createElement(ElementName.SELECT, {}, ...selectOptions),
        ),
      );

      const controlValue = getControlValue(
        <HTMLSelectElement>screen.getByLabelText(SELECT_LABEL),
      );

      expect(typeof controlValue).toBe('string');

      expect(controlValue).toEqual(selectedValue);
    });

    test('should get values from multi-select correctly', () => {
      const selectedValues = [Color.RED, Color.BLUE];
      const selectOptions = createOptionsElements(options, ...selectedValues);

      document.body.append(
        createLabelElement(
          SELECT_LABEL,
          createElement(
            ElementName.SELECT,
            {
              multiple: true,
            },
            ...selectOptions,
          ),
        ),
      );

      const controlValue = getControlValue(
        <HTMLSelectElement>screen.getByLabelText(SELECT_LABEL),
      );

      expect(typeof controlValue).toBe('object');

      expect(Array.isArray(controlValue)).toBe(true);

      expect(controlValue).toEqual(selectedValues);
    });
  });
});
