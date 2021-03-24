import { getElementsValues, getControlValue } from '~/helpers';
import { ControlType } from '~/common/enums';
import { CustomRecord } from '~/common/types';

const getFormValues = <T = CustomRecord>(formNode: HTMLFormElement): T => {
  return <T>getElementsValues(Array.from(formNode.elements));
};

export { ControlType, getControlValue, getFormValues };
