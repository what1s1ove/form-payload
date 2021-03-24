import { ControlType } from '~/common/enums';
import { getElementsValues } from '../get-elements-values/get-elements-values.helper';

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
      return (<HTMLInputElement>controlNode).value;
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
    case ControlType.FIELDSET: {
      return getElementsValues(
        <HTMLInputElement[]>(
          Array.from((<HTMLFieldSetElement>controlNode).elements)
        ),
      );
    }
  }
};

export { getControlValue };
