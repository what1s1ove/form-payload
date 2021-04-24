import { fireEvent, screen, waitFor } from '@testing-library/dom';
import { ControlType, ElementName } from '~/common/enums';
import { createElement } from '~/helpers';
import { getControlValue } from '~/index';
import {
  createLabelElement,
  createOptionsElements,
  getInputFiles,
} from './utils';

describe('getFormValues should work correctly', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('should work correctly with texts inputs', () => {
    test.each`
      type                    | value
      ${ControlType.COLOR}    | ${'#999999'}
      ${ControlType.EMAIL}    | ${'test@mail.com'}
      ${ControlType.HIDDEN}   | ${'metrics'}
      ${ControlType.PASSWORD} | ${'top-secret'}
      ${ControlType.RADIO}    | ${'color-1'}
      ${ControlType.SEARCH}   | ${'apples'}
      ${ControlType.TEL}      | ${'10000000000'}
      ${ControlType.TEXT}     | ${'Name'}
      ${ControlType.URL}      | ${'form-payload.com'}
      ${ControlType.OUTPUT}   | ${'empty'}
    `('should get value from input type $type correctly', ({ type, value }) => {
      document.body.append(
        createElement(ElementName.INPUT, {
          name: type,
          type: type,
          value,
        }),
      );

      const control = <HTMLInputElement>screen.getByDisplayValue(value);
      const controlValue = getControlValue(control);

      expect(typeof controlValue).toBe('string');

      expect(controlValue).toBe(value);
    });
  });

  describe('should work correctly with file input', () => {
    const INPUT_FILE_LABEL = 'Upload' as const;

    test('should get value from input type file correctly', async () => {
      const file = getInputFiles(new File(['test-file'], 'test-file'));

      document.body.append(
        createLabelElement(
          INPUT_FILE_LABEL,
          createElement(ElementName.INPUT, {
            type: ControlType.FILE,
          }),
        ),
      );

      const control = <HTMLInputElement>screen.getByLabelText(INPUT_FILE_LABEL);

      expect(getControlValue(control)).toBeNull();

      await waitFor(() =>
        fireEvent.change(control, {
          target: {
            files: file,
          },
        }),
      );

      expect(getControlValue(control) instanceof File).toBe(true);
    });

    test('should get value from multiple input type file correctly', async () => {
      const files = getInputFiles(
        new File(['test-file-1'], 'test-file-1'),
        new File(['test-file-2'], 'test-file-2'),
      );

      document.body.append(
        createLabelElement(
          INPUT_FILE_LABEL,
          createElement(ElementName.INPUT, {
            type: ControlType.FILE,
            multiple: true,
          }),
        ),
      );

      const control = <HTMLInputElement>screen.getByLabelText(INPUT_FILE_LABEL);

      expect(Array.isArray(getControlValue(control))).toBe(true);

      await waitFor(() =>
        fireEvent.change(control, {
          target: {
            files,
          },
        }),
      );

      const controlValue = <File[]>getControlValue(control);

      expect(controlValue.every((file) => file instanceof File)).toBe(true);

      expect(controlValue.length).toBe(files.length);
    });
  });

  describe('should work correctly with select', () => {
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

      expect(Array.isArray(controlValue)).toBe(true);

      expect(controlValue).toEqual(selectedValues);
    });
  });
});
