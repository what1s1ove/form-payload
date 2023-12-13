import { deepEqual, equal, throws } from 'node:assert/strict';
import { beforeEach, describe, test } from 'node:test';

import { fireEvent, waitFor } from '@testing-library/dom';

import { FormPayloadError, getFormControlPayload } from '../src/index.js';
import { VALUE_AS_ARRAY_IDENTIFIER } from '../src/libs/constants/constants.js';
import { ControlElementType } from '../src/libs/enums/enums.js';

describe('getFormControlPayload should work correctly', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	describe('should work with HTMLInputElement correctly', () => {
		test('should get value from string inputs correctly', () => {
			const inputs = /** @type {const} */ ([
				[ControlElementType.TEXT, 'Name'],
				[ControlElementType.PASSWORD, 'top-secret'],
				[ControlElementType.SEARCH, 'apples'],
				[ControlElementType.URL, 'form-payload.com'],
				[ControlElementType.TEL, '10000000000'],
				[ControlElementType.COLOR, '#999999'],
				[ControlElementType.RADIO, 'color-1'],
				[ControlElementType.HIDDEN, 'metrics'],
			]);

			for (const [type, value] of inputs) {
				document.body.innerHTML = /* HTML */ `
					<form>
						<input type="${type}" value="${value}" />
					</form>
				`;

				const controlElement = /** @type {HTMLInputElement} */ (
					document.querySelector('input')
				);

				const controlValue = getFormControlPayload(controlElement);

				equal(typeof controlValue, 'string');

				equal(controlValue, value);

				document.body.innerHTML = '';
			}
		});

		test('should get value from number inputs correctly', () => {
			const inputs = /** @type {const} */ ([
				[ControlElementType.NUMBER, 18],
				[ControlElementType.RANGE, 69],
			]);

			for (const [type, value] of inputs) {
				document.body.innerHTML = /* HTML */ `
					<form>
						<input type="${type}" value="${value}" />
					</form>
				`;

				const controlElement = /** @type {HTMLInputElement} */ (
					document.querySelector('input')
				);

				const controlElementValue =
					getFormControlPayload(controlElement);

				equal(typeof controlElementValue, 'number');

				equal(controlElementValue, value);

				document.body.innerHTML = '';
			}
		});

		describe('should get value from boolean inputs correctly', () => {
			test('should get value from regular boolean input correctly', () => {
				const inputs = /** @type {const} */ ([
					[ControlElementType.CHECKBOX, false],
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

					const controlElement = /** @type {HTMLInputElement} */ (
						document.querySelector('input')
					);

					const controlElementValue =
						getFormControlPayload(controlElement);

					equal(typeof controlElementValue, 'boolean');

					equal(controlElementValue, isChecked);

					document.body.innerHTML = '';
				}
			});

			test('should get single value from boolean input with collection identifier correctly', () => {
				const inputs = /** @type {const} */ ([
					[ControlElementType.CHECKBOX, 'banana', true],
					[ControlElementType.CHECKBOX, 'apple', false],
					[ControlElementType.CHECKBOX, 'apple', true],
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

					const controlElement = /** @type {HTMLInputElement} */ (
						document.querySelector('input')
					);

					const controlElementValue =
						getFormControlPayload(controlElement);

					equal(Array.isArray(controlElementValue), true);

					deepEqual(controlElementValue, isChecked ? [value] : []);

					document.body.innerHTML = '';
				}
			});
		});

		test('should get value from date inputs correctly', () => {
			const inputs = /** @type {const} */ ([
				[ControlElementType.DATE, '1998-08-03'],
				[ControlElementType.TIME, '13:30'],
				[ControlElementType.MONTH, '2001-06'],
				[ControlElementType.WEEK, '2017-W01'],
				[ControlElementType.DATETIME_LOCAL, '2018-06-12T19:30'],
			]);

			for (const [type, value] of inputs) {
				document.body.innerHTML = /* HTML */ `
					<form>
						<input type="${type}" value="${value}" />
					</form>
				`;

				const controlElement = /** @type {HTMLInputElement} */ (
					document.querySelector('input')
				);

				const controlElementValue =
					getFormControlPayload(controlElement);

				equal(controlElementValue instanceof Date, true);

				document.body.innerHTML = '';
			}
		});

		describe('should get value from email inputs correctly', () => {
			test('should get value from singular email input correctly', () => {
				const email = 'test@mail.com';

				document.body.innerHTML = /* HTML */ `
					<form>
						<input
							type="${ControlElementType.EMAIL}"
							value="${email}"
						/>
					</form>
				`;

				const controlElement = /** @type {HTMLInputElement} */ (
					document.querySelector('input')
				);

				const controlElementValue =
					getFormControlPayload(controlElement);

				equal(typeof controlElementValue, 'string');

				equal(controlElementValue, email);
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
							type="${ControlElementType.EMAIL}"
							value="${emails.join(',')}"
							multiple
						/>
					</form>
				`;

				const controlElement = /** @type {HTMLInputElement} */ (
					document.querySelector('input')
				);

				const controlElementValue =
					getFormControlPayload(controlElement);

				equal(Array.isArray(controlElementValue), true);

				equal(
					/** @type {string[]} */ (controlElementValue).length,
					emails.length,
				);

				equal(
					/** @type {string[]} */ (controlElementValue).every(
						(email) => {
							return email.trim().length === email.length;
						},
					),
					true,
				);

				deepEqual(controlElementValue, emails);
			});
		});

		describe('should get value from file inputs correctly', () => {
			test('should get value from singular file input correctly', async () => {
				const file = [new File(['test-file'], 'test-file')];

				document.body.innerHTML = /* HTML */ `
					<form>
						<input type="${ControlElementType.FILE}" />
					</form>
				`;

				const controlElement = /** @type {HTMLInputElement} */ (
					document.querySelector('input')
				);

				equal(getFormControlPayload(controlElement), null);

				await waitFor(() =>
					fireEvent.change(controlElement, {
						target: {
							files: file,
						},
					}),
				);

				equal(
					getFormControlPayload(controlElement) instanceof File,
					true,
				);
			});

			test('should get value from multiple file input correctly', async () => {
				const files = [
					new File(['test-file-1'], 'test-file-1'),
					new File(['test-file-2'], 'test-file-2'),
				];

				document.body.innerHTML = /* HTML */ `
					<form>
						<input type="${ControlElementType.FILE}" multiple />
					</form>
				`;

				const controlElement = /** @type {HTMLInputElement} */ (
					document.querySelector('input')
				);

				equal(
					Array.isArray(getFormControlPayload(controlElement)),
					true,
				);

				await waitFor(() =>
					fireEvent.change(controlElement, {
						target: {
							files,
						},
					}),
				);

				const controlElementValue = /** @type {File[]} */ (
					getFormControlPayload(controlElement)
				);

				equal(
					controlElementValue.every((file) => file instanceof File),
					true,
				);

				equal(controlElementValue.length, controlElementValue.length);
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

			const controlElement = /** @type {HTMLTextAreaElement} */ (
				document.querySelector('textarea')
			);

			const controlElementValue = getFormControlPayload(controlElement);

			equal(typeof controlElementValue, 'string');

			equal(controlElementValue, TEXTAREA_VALUE);
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

			const controlElement = /** @type {HTMLSelectElement} */ (
				document.querySelector('select')
			);

			const controlElementValue = getFormControlPayload(controlElement);

			equal(typeof controlElementValue, 'string');

			equal(controlElementValue, selectedValue);
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

			const controlElement = /** @type {HTMLSelectElement} */ (
				document.querySelector('select')
			);

			const controlElementValue = getFormControlPayload(controlElement);

			equal(Array.isArray(controlElementValue), true);

			equal(
				/** @type {unknown[]} */ (controlElementValue).length,
				selectedValues.length,
			);

			deepEqual(controlElementValue, selectedValues);
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

			const controlElement = /** @type {HTMLOutputElement} */ (
				document.querySelector('output')
			);

			const controlElementValue = getFormControlPayload(controlElement);

			equal(typeof controlElementValue, 'string');

			equal(controlElementValue, OUTPUT_VALUE);
		});
	});

	describe('should work with HTMLFieldSetElement correctly', () => {
		test('should get value from regular HTMLFieldSetElement correctly', () => {
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
						type="${ControlElementType.TEXT}"
						name="${FormPayloadKey.NAME}"
						value="${formPayload.name}"
					/>
					<input
						type="${ControlElementType.DATE}"
						name="${FormPayloadKey.BIRTHDAY}"
						value="${BirthdayDate.OWN}"
					/>
					<fieldset name="${FormPayloadKey.BESTFRIEND}">
						<input
							type="${ControlElementType.TEXT}"
							name="${FormPayloadKey.BESTFRIEND_NAME}"
							value="${formPayload.bestfriend.name}"
						/>
						<input
							type="${ControlElementType.CHECKBOX}"
							name="${FormPayloadKey.BESTFRIEND_HAS_FRIEND}"
							${formPayload.bestfriend.hasFriend ? 'checked' : ''}
						/>
						<fieldset name="${FormPayloadKey.BESTFRIEND_CHILD}">
							<input
								type="${ControlElementType.TEXT}"
								name="${FormPayloadKey.BESTFRIEND_CHILD_NAME}"
								value="${formPayload.bestfriend.child.name}"
							/>
							<input
								type="${ControlElementType.NUMBER}"
								name="${FormPayloadKey.BESTFRIEND_CHILD_AGE}"
								value="${formPayload.bestfriend.child.age}"
							/>
							<input
								type="${ControlElementType.CHECKBOX}"
								name="${FormPayloadKey.BESTFRIEND_CHILD_IS_ADULT}"
								${formPayload.bestfriend.child.isAdult
									? 'checked'
									: ''}
							/>
						</fieldset>
					</fieldset>
					<fieldset name="${FormPayloadKey.SCHOOLFRIEND}">
						<input
							type="${ControlElementType.TEXT}"
							name="${FormPayloadKey.SCHOOLFRIEND_NAME}"
							value="${formPayload.schoolfriend.name}"
						/>
						<input
							type="${ControlElementType.DATE}"
							name="${FormPayloadKey.SCHOOLFRIEND_BIRTHDAY}"
							value="${BirthdayDate.SCHOOLFRIEND}"
						/>
					</fieldset>
				</fieldset>
			`;

			const controlElement = /** @type {HTMLFieldSetElement} */ (
				document.querySelector('fieldset')
			);

			deepEqual(getFormControlPayload(controlElement), formPayload);
		});

		test('should get value from multiple HTMLFieldSetElement correctly', () => {
			const FormPayloadKey = /** @type {const} */ ({
				SHOP_NAME: 'name',
			});

			const formPayload = {
				[FormPayloadKey.SHOP_NAME]: 'Fruit Shop',
			};

			document.body.innerHTML = /* HTML */ `
				<fieldset name="shops${VALUE_AS_ARRAY_IDENTIFIER}">
					<input
						type="${ControlElementType.TEXT}"
						name="${FormPayloadKey.SHOP_NAME}"
						value="${formPayload.name}"
					/>
				</fieldset>
			`;

			const controlElement = /** @type {HTMLFieldSetElement} */ (
				document.querySelector('fieldset')
			);

			const controlElementValue = getFormControlPayload(controlElement);

			equal(Array.isArray(controlElementValue), true);

			deepEqual(controlElementValue, [formPayload]);
		});
	});

	describe('should work correctly with an unexpected control element type', () => {
		test('should throw FormPayloadError for elements without type', () => {
			const controlElement = /** @type {HTMLInputElement} */ ({});

			throws(
				() => getFormControlPayload(controlElement),
				FormPayloadError,
			);
		});

		test('should throw FormPayloadError with unknown input type', () => {
			const controlElement = /** @type {HTMLInputElement} */ ({
				type: 'unknown-type',
			});

			throws(
				() => getFormControlPayload(controlElement),
				FormPayloadError,
			);
		});
	});
});
