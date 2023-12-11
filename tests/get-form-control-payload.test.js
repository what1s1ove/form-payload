import { deepEqual, equal, throws } from 'node:assert/strict';
import { beforeEach, describe, test } from 'node:test';

import { fireEvent, waitFor } from '@testing-library/dom';

import { FormPayloadError, getFormControlPayload } from '../src/index.js';
import { VALUE_AS_ARRAY_IDENTIFIER } from '../src/libs/constants/constants.js';
import { ControlType } from '../src/libs/enums/enums.js';

describe('getFormControlPayload should work correctly', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	describe('should work with HTMLInputElement correctly', () => {
		test('should get value from string inputs correctly', () => {
			const inputs = /** @type {const} */ ([
				[ControlType.TEXT, 'Name'],
				[ControlType.PASSWORD, 'top-secret'],
				[ControlType.SEARCH, 'apples'],
				[ControlType.URL, 'form-payload.com'],
				[ControlType.TEL, '10000000000'],
				[ControlType.COLOR, '#999999'],
				[ControlType.RADIO, 'color-1'],
				[ControlType.HIDDEN, 'metrics'],
			]);

			for (const [type, value] of inputs) {
				document.body.innerHTML = /* HTML */ `
					<form>
						<input type="${type}" value="${value}" />
					</form>
				`;

				const control = /** @type {HTMLInputElement} */ (
					document.querySelector('input')
				);

				const controlValue = getFormControlPayload(control);

				equal(typeof controlValue, 'string');

				equal(controlValue, value);

				document.body.innerHTML = '';
			}
		});

		test('should get value from number inputs correctly', () => {
			const inputs = /** @type {const} */ ([
				[ControlType.NUMBER, 18],
				[ControlType.RANGE, 69],
			]);

			for (const [type, value] of inputs) {
				document.body.innerHTML = /* HTML */ `
					<form>
						<input type="${type}" value="${value}" />
					</form>
				`;

				const control = /** @type {HTMLInputElement} */ (
					document.querySelector('input')
				);

				const controlValue = getFormControlPayload(control);

				equal(typeof controlValue, 'number');

				equal(controlValue, value);

				document.body.innerHTML = '';
			}
		});

		describe('should get value from boolean inputs correctly', () => {
			test('should get value from regular boolean input correctly', () => {
				const inputs = /** @type {const} */ ([
					[ControlType.CHECKBOX, false],
				]);

				for (const [type, isChecked] of inputs) {
					document.body.innerHTML = /* HTML */ `
						<form>
							<input
								type="${type}"
								${isChecked ? 'checked' : ''}
							/>
						</form>
					`;

					const control = /** @type {HTMLInputElement} */ (
						document.querySelector('input')
					);

					const controlValue = getFormControlPayload(control);

					equal(typeof controlValue, 'boolean');

					equal(controlValue, isChecked);

					document.body.innerHTML = '';
				}
			});

			test('should get single value from boolean input with collection identifier correctly', () => {
				const inputs = /** @type {const} */ ([
					[ControlType.CHECKBOX, 'banana', true],
					[ControlType.CHECKBOX, 'apple', false],
					[ControlType.CHECKBOX, 'apple', true],
				]);

				for (const [type, value, isChecked] of inputs) {
					document.body.innerHTML = /* HTML */ `
						<form>
							<input
								name="fruits${VALUE_AS_ARRAY_IDENTIFIER}"
								type="${type}"
								value="${value}"
								${isChecked ? 'checked' : ''}
							/>
						</form>
					`;

					const control = /** @type {HTMLInputElement} */ (
						document.querySelector('input')
					);

					const controlValue = getFormControlPayload(control);

					equal(Array.isArray(controlValue), true);

					deepEqual(controlValue, isChecked ? [value] : []);

					document.body.innerHTML = '';
				}
			});
		});

		test('should get value from date inputs correctly', () => {
			const inputs = /** @type {const} */ ([
				[ControlType.DATE, '1998-08-03'],
				[ControlType.TIME, '13:30'],
				[ControlType.MONTH, '2001-06'],
				[ControlType.WEEK, '2017-W01'],
				[ControlType.DATETIME_LOCAL, '2018-06-12T19:30'],
			]);

			for (const [type, value] of inputs) {
				document.body.innerHTML = /* HTML */ `
					<form>
						<input type="${type}" value="${value}" />
					</form>
				`;

				const control = /** @type {HTMLInputElement} */ (
					document.querySelector('input')
				);

				const controlValue = getFormControlPayload(control);

				equal(controlValue instanceof Date, true);

				document.body.innerHTML = '';
			}
		});

		describe('should get value from email inputs correctly', () => {
			test('should get value from singular email input correctly', () => {
				const email = 'test@mail.com';

				document.body.innerHTML = /* HTML */ `
					<form>
						<input type="${ControlType.EMAIL}" value="${email}" />
					</form>
				`;

				const control = /** @type {HTMLInputElement} */ (
					document.querySelector('input')
				);

				const controlValue = getFormControlPayload(control);

				equal(typeof controlValue, 'string');

				equal(controlValue, email);
			});

			test('should get value from multiple email input correctly', () => {
				const emails = [
					'example@mail.com',
					'example@mail.ua',
					'example@mail.org',
					'example@mail.co',
				];

				document.body.innerHTML = /* HTML */ `
					<form>
						<input
							type="${ControlType.EMAIL}"
							value="${emails.join(',')}"
							multiple
						/>
					</form>
				`;

				const control = /** @type {HTMLInputElement} */ (
					document.querySelector('input')
				);

				const controlValue = getFormControlPayload(control);

				equal(Array.isArray(controlValue), true);

				equal(
					/** @type {string[]} */ (controlValue).length,
					emails.length,
				);

				equal(
					/** @type {string[]} */ (controlValue).every((email) => {
						return email.trim().length === email.length;
					}),
					true,
				);

				deepEqual(controlValue, emails);
			});
		});

		describe('should get value from file inputs correctly', () => {
			test('should get value from singular file input correctly', async () => {
				const file = [new File(['test-file'], 'test-file')];

				document.body.innerHTML = /* HTML */ `
					<form>
						<input type="${ControlType.FILE}" />
					</form>
				`;

				const control = /** @type {HTMLInputElement} */ (
					document.querySelector('input')
				);

				equal(getFormControlPayload(control), null);

				await waitFor(() =>
					fireEvent.change(control, {
						target: {
							files: file,
						},
					}),
				);

				equal(getFormControlPayload(control) instanceof File, true);
			});

			test('should get value from multiple file input correctly', async () => {
				const files = [
					new File(['test-file-1'], 'test-file-1'),
					new File(['test-file-2'], 'test-file-2'),
				];

				document.body.innerHTML = /* HTML */ `
					<form>
						<input type="${ControlType.FILE}" multiple />
					</form>
				`;

				const control = /** @type {HTMLInputElement} */ (
					document.querySelector('input')
				);

				equal(Array.isArray(getFormControlPayload(control)), true);

				await waitFor(() =>
					fireEvent.change(control, {
						target: {
							files,
						},
					}),
				);

				const controlValue = /** @type {File[]} */ (
					getFormControlPayload(control)
				);

				equal(
					controlValue.every((file) => file instanceof File),
					true,
				);

				equal(controlValue.length, controlValue.length);
			});
		});
	});

	describe('should work with HTMLTextAreaElement correctly', () => {
		test('should get value from HTMLTextAreaElement correctly', () => {
			const TEXTAREA_VALUE = 'Hello, World!';

			document.body.innerHTML = /* HTML */ `
				<form>
					<textarea>${TEXTAREA_VALUE}</textarea>
				</form>
			`;

			const control = /** @type {HTMLTextAreaElement} */ (
				document.querySelector('textarea')
			);

			const controlValue = getFormControlPayload(control);

			equal(typeof controlValue, 'string');

			equal(controlValue, TEXTAREA_VALUE);
		});
	});

	describe('should work with HTMLSelectElement correctly', () => {
		const Color = {
			BLUE: 'blue',
			RED: 'red',
			YELLOW: 'yellow',
		};

		const options = Object.values(Color);

		test('should get value from singular select correctly', () => {
			const selectedValue = Color.RED;

			document.body.innerHTML = /* HTML */ `
				<form>
					<select>
						${options
							.map(
								(option) => /** HTML */ `
							<option
								value="${option}"
								${option === selectedValue ? 'selected' : ''}
							>
								${option}
							</option>
						`,
							)
							.join('')}
					</select>
				</form>
			`;

			const control = /** @type {HTMLSelectElement} */ (
				document.querySelector('select')
			);

			const controlValue = getFormControlPayload(control);

			equal(typeof controlValue, 'string');

			equal(controlValue, selectedValue);
		});

		test('should get value from multiple select correctly', () => {
			const selectedValues = [Color.BLUE, Color.RED];

			document.body.innerHTML = /* HTML */ `
				<form>
					<select multiple>
						${options
							.map(
								(option) => /** HTML */ `
									<option
										value="${option}"
										${selectedValues.includes(option) ? 'selected' : ''}
									>
										${option}
									</option>
								`,
							)
							.join(',')}
					</select>
				</form>
			`;

			const control = /** @type {HTMLSelectElement} */ (
				document.querySelector('select')
			);

			const controlValue = getFormControlPayload(control);

			equal(Array.isArray(controlValue), true);

			equal(
				/** @type {unknown[]} */ (controlValue).length,
				selectedValues.length,
			);

			deepEqual(controlValue, selectedValues);
		});
	});

	describe('should work with HTMLOutputElement correctly', () => {
		test('should get value from HTMLOutputElement correctly', () => {
			const OUTPUT_VALUE = 'Hello, World!';

			document.body.innerHTML = /* HTML */ `
				<form>
					<output>${OUTPUT_VALUE}</output>
				</form>
			`;

			const control = /** @type {HTMLOutputElement} */ (
				document.querySelector('output')
			);

			const controlValue = getFormControlPayload(control);

			equal(typeof controlValue, 'string');

			equal(controlValue, OUTPUT_VALUE);
		});
	});

	describe('should work with HTMLFieldSetElement correctly', () => {
		test('should get value from HTMLFieldSetElement correctly', () => {
			const BirthdayDate = {
				OWN: '1994-06-13',
				SCHOOLFRIEND: '1995-03-18',
			};

			const FormPayloadKey = /** @type {const} */ ({
				BESTFRIEND: 'bestfriend',
				BESTFRIEND_CHILD: 'child',
				BESTFRIEND_CHILD_AGE: 'age',
				BESTFRIEND_CHILD_IS_ADULT: 'isAdult',
				BESTFRIEND_CHILD_NAME: 'name',
				BESTFRIEND_HAS_FRIEND: 'hasFriend',
				BESTFRIEND_NAME: 'name',
				BIRTHDAY: 'birthday',
				NAME: 'name',
				SCHOOLFRIEND: 'schoolfriend',
				SCHOOLFRIEND_BIRTHDAY: 'birthday',
				SCHOOLFRIEND_NAME: 'name',
			});

			const formPayload = {
				[FormPayloadKey.BESTFRIEND]: {
					[FormPayloadKey.BESTFRIEND_CHILD]: {
						[FormPayloadKey.BESTFRIEND_CHILD_AGE]: 18,
						[FormPayloadKey.BESTFRIEND_CHILD_IS_ADULT]: true,
						[FormPayloadKey.BESTFRIEND_CHILD_NAME]: 'Eva',
					},
					[FormPayloadKey.BESTFRIEND_HAS_FRIEND]: true,
					[FormPayloadKey.BESTFRIEND_NAME]: 'Jason',
				},
				[FormPayloadKey.BIRTHDAY]: new Date(BirthdayDate.OWN),
				[FormPayloadKey.NAME]: 'David',
				[FormPayloadKey.SCHOOLFRIEND]: {
					[FormPayloadKey.SCHOOLFRIEND_BIRTHDAY]: new Date(
						BirthdayDate.SCHOOLFRIEND,
					),
					[FormPayloadKey.SCHOOLFRIEND_NAME]: 'Ted',
				},
			};

			document.body.innerHTML = /* HTML */ `
				<fieldset>
					<input
						type="${ControlType.TEXT}"
						name="${FormPayloadKey.NAME}"
						value="${formPayload.name}"
					/>
					<input
						type="${ControlType.DATE}"
						name="${FormPayloadKey.BIRTHDAY}"
						value="${BirthdayDate.OWN}"
					/>
					<fieldset name="${FormPayloadKey.BESTFRIEND}">
						<input
							type="${ControlType.TEXT}"
							name="${FormPayloadKey.BESTFRIEND_NAME}"
							value="${formPayload.bestfriend.name}"
						/>
						<input
							type="${ControlType.CHECKBOX}"
							name="${FormPayloadKey.BESTFRIEND_HAS_FRIEND}"
							${formPayload.bestfriend.hasFriend ? 'checked' : ''}
						/>
						<fieldset name="${FormPayloadKey.BESTFRIEND_CHILD}">
							<input
								type="${ControlType.TEXT}"
								name="${FormPayloadKey.BESTFRIEND_CHILD_NAME}"
								value="${formPayload.bestfriend.child.name}"
							/>
							<input
								type="${ControlType.NUMBER}"
								name="${FormPayloadKey.BESTFRIEND_CHILD_AGE}"
								value="${formPayload.bestfriend.child.age}"
							/>
							<input
								type="${ControlType.CHECKBOX}"
								name="${FormPayloadKey.BESTFRIEND_CHILD_IS_ADULT}"
								${formPayload.bestfriend.child.isAdult
									? 'checked'
									: ''}
							/>
						</fieldset>
					</fieldset>
					<fieldset name="${FormPayloadKey.SCHOOLFRIEND}">
						<input
							type="${ControlType.TEXT}"
							name="${FormPayloadKey.SCHOOLFRIEND_NAME}"
							value="${formPayload.schoolfriend.name}"
						/>
						<input
							type="${ControlType.DATE}"
							name="${FormPayloadKey.SCHOOLFRIEND_BIRTHDAY}"
							value="${BirthdayDate.SCHOOLFRIEND}"
						/>
					</fieldset>
				</fieldset>
			`;

			const control = /** @type {HTMLFieldSetElement} */ (
				document.querySelector('fieldset')
			);

			deepEqual(getFormControlPayload(control), formPayload);
		});
	});

	describe('should work correctly with an unexpected control type', () => {
		test('should throw FormPayloadError for elements without type', () => {
			const control = /** @type {HTMLInputElement} */ ({});

			throws(() => getFormControlPayload(control), FormPayloadError);
		});

		test('should throw FormPayloadError with unknown input type', () => {
			const control = /** @type {HTMLInputElement} */ ({
				type: 'unknown-type',
			});

			throws(() => getFormControlPayload(control), FormPayloadError);
		});
	});
});
