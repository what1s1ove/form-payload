import { ControlType } from '~/common/enums';
import { CustomRecord } from '~/common/types';
import { checkIsReferToAnotherNode } from '../check-is-refer-to-another-node/check-is-refer-to-another-node.helper';
import { getAllowedElements } from '../get-allowed-elements/get-allowed-elements.helper';
import { getMultiSelectValues, getInputFileValue } from './helpers';

const getElementsValues = (controlNodeElements: Element[]): CustomRecord => {
  const elements = <HTMLInputElement[]>(
    getAllowedElements(Array.from(controlNodeElements))
  );

  return elements.reduce<CustomRecord>((acc, element, _idx, arr) => {
    const isReferToAnotherNode = checkIsReferToAnotherNode(element, ...arr);

    if (isReferToAnotherNode) {
      return acc;
    }

    return {
      ...acc,
      [element.name]: getControlValue(element),
    };
  }, {});
};

const getControlValue = (controlNode: Element): unknown => {
  switch ((<HTMLInputElement>controlNode).type) {
    case ControlType.COLOR:
    case ControlType.EMAIL:
    case ControlType.HIDDEN:
    case ControlType.PASSWORD:
    case ControlType.RADIO:
    case ControlType.SEARCH:
    case ControlType.TEL:
    case ControlType.TEXT:
    case ControlType.TEXTAREA:
    case ControlType.URL:
    case ControlType.OUTPUT:
    case ControlType.SELECT_ONE: {
      return (<HTMLInputElement | HTMLSelectElement>controlNode).value;
    }
    case ControlType.DATE:
    case ControlType.DATETIME_LOCAL:
    case ControlType.MONTH:
    case ControlType.TIME:
    case ControlType.WEEK: {
      return (<HTMLInputElement>controlNode).valueAsDate;
    }
    case ControlType.NUMBER:
    case ControlType.RANGE: {
      return (<HTMLInputElement>controlNode).valueAsNumber;
    }
    case ControlType.CHECKBOX: {
      return (<HTMLInputElement>controlNode).checked;
    }
    case ControlType.SELECT_MULTIPLE: {
      return getMultiSelectValues(<HTMLSelectElement>controlNode);
    }
    case ControlType.FILE: {
      return getInputFileValue(<HTMLInputElement>controlNode);
    }
    case ControlType.FIELDSET: {
      return getElementsValues(
        <HTMLInputElement[]>(
          Array.from((<HTMLFieldSetElement>controlNode).elements)
        ),
      );
    }
  }
};

export { getElementsValues, getControlValue };
