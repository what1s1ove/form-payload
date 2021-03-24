import { CustomRecord } from '~/common/types';
import { checkIsReferToAnotherNode } from '../check-is-refer-to-another-node/check-is-refer-to-another-node.helper';
import { getAllowedElements } from '../get-allowed-elements/get-allowed-elements.helper';
import { getControlValue } from '../get-control-value/get-control-value.helper';

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

export { getElementsValues };
