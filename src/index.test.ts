import { screen } from '@testing-library/dom';
import { ControlType } from '~/common/enums';
import { createElement } from '~/helpers';

test('uses jest-dom', () => {
  document.body.append(
    createElement(
      'form',
      {
        name: '',
      },
      createElement('input', {
        name: 'test1',
      }),
      createElement('input', {
        name: 'test2',
      }),
      createElement(
        'p',
        {},
        createElement('input', {
          name: 'test3',
          type: ControlType.NUMBER,
          valueAsNumber: 1,
        }),
        createElement('input', {
          name: '1',
          type: ControlType.DATE,
          valueAsDate: new Date('2021-03-24'),
        }),
      ),
    ),
  );

  expect(screen.queryByRole('form')).not.toBeEmptyDOMElement();
});
