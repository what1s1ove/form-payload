import { deepEqual } from 'node:assert/strict';
import { beforeEach, describe, test } from 'node:test';

import { getFormPayload } from '../src/index.js';
import {
	BANNED_CONTROL_ELEMENT_TYPES,
	VALUE_AS_ARRAY_IDENTIFIER,
} from '../src/libs/constants/constants.js';
import { ControlElementType } from '../src/libs/enums/enums.js';
import { bannedElementNameToElementInstance } from '../src/libs/maps/maps.js';

describe('getFormPayload should work correctly', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	test('should skip banned control element types', () => {
		document.body.innerHTML = /* HTML */ `
			<form>
				${BANNED_CONTROL_ELEMENT_TYPES.map(
					(type) => `<input type="${type}" name="${type}" />`,
				).join(',')}
			</form>
		`;

		const formElement = /** @type {HTMLFormElement} */ (
			document.querySelector('form')
		);

		deepEqual(getFormPayload(formElement), {});
	});

	test('should skip banned elements', () => {
		document.body.innerHTML = /* HTML */ `
			<form>
				${Object.keys(bannedElementNameToElementInstance)
					.map(
						(elementName) =>
							`<${elementName} type="${elementName}" name="${elementName}"></${elementName}>`,
					)
					.join(',')}
			</form>
		`;

		const formElement = /** @type {HTMLFormElement} */ (
			document.querySelector('form')
		);

		deepEqual(getFormPayload(formElement), {});
	});

	test('should skip control elements without name', () => {
		document.body.innerHTML = /* HTML */ `
			<form>
				<input name="" />
			</form>
		`;

		const formElement = /** @type {HTMLFormElement} */ (
			document.querySelector('form')
		);

		deepEqual(getFormPayload(formElement), {});
	});

	describe('should get multiple value from control elements with collection identifier correctly', () => {
		test('should get multiple value from boolean inputs with collection identifier correctly', () => {
			const Fruit = {
				APPLE: 'apple',
				BANANA: 'banana',
				ORANGE: 'orange',
			};

			const formPayload = {
				fruits: [Fruit.BANANA, Fruit.ORANGE],
			};

			document.body.innerHTML = /* HTML */ `
				<form>
					${Object.values(Fruit)
						.map(
							(fruit) => /* HTML */ `
								<input
									name="fruits${VALUE_AS_ARRAY_IDENTIFIER}"
									type="${ControlElementType.CHECKBOX}"
									value="${fruit}"
									${formPayload.fruits.includes(fruit)
										? 'checked'
										: ''}
								/>
							`,
						)
						.join('')}
				</form>
			`;

			const formElement = /** @type {HTMLFormElement} */ (
				document.querySelector('form')
			);

			deepEqual(getFormPayload(formElement), formPayload);
		});

		test('should get multiple value from fieldsets with collection identifier correctly', () => {
			const FormPayloadKey = /** @type {const} */ ({
				FRUIT_NAME: 'name',
				FRUITS: 'fruits',
			});

			const formPayload = {
				[FormPayloadKey.FRUITS]: [
					{
						[FormPayloadKey.FRUIT_NAME]: 'Apple',
					},
					{
						[FormPayloadKey.FRUIT_NAME]: 'Banana',
					},
				],
			};

			document.body.innerHTML = /* HTML */ `
				<form>
					${formPayload.fruits
						.map(
							(fruit) => /* HTML */ `
								<fieldset
									name="${FormPayloadKey.FRUITS}${VALUE_AS_ARRAY_IDENTIFIER}"
								>
									<input
										name="${FormPayloadKey.FRUIT_NAME}"
										type="${ControlElementType.TEXT}"
										value="${fruit.name}"
									/>
								</fieldset>
							`,
						)
						.join('')}
				</form>
			`;

			const formElement = /** @type {HTMLFormElement} */ (
				document.querySelector('form')
			);

			deepEqual(getFormPayload(formElement), formPayload);
		});
	});

	test('should return the correct object with values', () => {
		const BIRTHDAY_DATE = '1992-06-13';

		const FormPayloadKey = /** @type {const} */ ({
			BIRTHDAY: 'birthday',
			FRIENDS_COUNT: 'friendsCount',
			HAS_FRIENDS: 'hasFriends',
			MAIN_FRIEND: 'mainFriend',
			MAIN_FRIEND_NAME: 'name',
			NAME: 'name',
		});

		const formPayload = {
			[FormPayloadKey.BIRTHDAY]: new Date(BIRTHDAY_DATE),
			[FormPayloadKey.FRIENDS_COUNT]: 3,
			[FormPayloadKey.HAS_FRIENDS]: true,
			[FormPayloadKey.MAIN_FRIEND]: {
				[FormPayloadKey.MAIN_FRIEND_NAME]: 'John',
			},
			[FormPayloadKey.NAME]: 'Brad',
		};

		document.body.innerHTML = /* HTML */ `
			<form>
				<input
					type="${ControlElementType.TEXT}"
					name="${FormPayloadKey.NAME}"
					value="${formPayload.name}"
				/>
				<input
					type="${ControlElementType.DATE}"
					name="${FormPayloadKey.BIRTHDAY}"
					value="${BIRTHDAY_DATE}"
				/>
				<input
					type="${ControlElementType.CHECKBOX}"
					name="${FormPayloadKey.HAS_FRIENDS}"
					${formPayload.hasFriends ? 'checked' : ''}
				/>
				<input
					type="${ControlElementType.NUMBER}"
					name="${FormPayloadKey.FRIENDS_COUNT}"
					value="${formPayload.friendsCount}"
				/>
				<fieldset name="${FormPayloadKey.MAIN_FRIEND}">
					<input
						type="${ControlElementType.TEXT}"
						name="${FormPayloadKey.MAIN_FRIEND_NAME}"
						value="${formPayload.mainFriend.name}"
					/>
				</fieldset>
			</form>
		`;

		const formElement = /** @type {HTMLFormElement} */ (
			document.querySelector('form')
		);

		deepEqual(getFormPayload(formElement), formPayload);
	});

	describe('should get multiple value from control elements with collection identifier correctly', () => {
		test('should get multiple value from boolean inputs with collection identifier correctly', () => {
			const Fruit = {
				APPLE: 'apple',
				BANANA: 'banana',
				ORANGE: 'orange',
			};

			const formPayload = {
				fruits: [Fruit.BANANA, Fruit.ORANGE],
			};

			document.body.innerHTML = /* HTML */ `
				<form>
					${Object.values(Fruit)
						.map(
							(fruit) => /* HTML */ `
								<input
									name="fruits${VALUE_AS_ARRAY_IDENTIFIER}"
									type="${ControlElementType.CHECKBOX}"
									value="${fruit}"
									${formPayload.fruits.includes(fruit)
										? 'checked'
										: ''}
								/>
							`,
						)
						.join('')}
				</form>
			`;

			const formElement = /** @type {HTMLFormElement} */ (
				document.querySelector('form')
			);

			deepEqual(getFormPayload(formElement), formPayload);
		});
	});
});
