import { deepEqual } from 'node:assert/strict';
import { beforeEach, describe, test } from 'node:test';

import { getFormPayload } from '../src/index.js';
import { BANNED_CONTROL_TYPES } from '../src/libs/constants/constants.js';
import { ControlType } from '../src/libs/enums/enums.js';
import { bannedElementNameToElementInstance } from '../src/libs/maps/maps.js';

describe('getFormPayload should work correctly', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	test('should skip banned control types', () => {
		document.body.innerHTML = /* HTML */ `
			<form>
				${BANNED_CONTROL_TYPES.map(
					(type) => `<input type="${type}" name="${type}" />`,
				).join(',')}
			</form>
		`;

		const formNode = /** @type {HTMLFormElement} */ (
			document.querySelector('form')
		);

		deepEqual(getFormPayload(formNode), {});
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

		const formNode = /** @type {HTMLFormElement} */ (
			document.querySelector('form')
		);

		deepEqual(getFormPayload(formNode), {});
	});

	test('should skip controls without name', () => {
		document.body.innerHTML = /* HTML */ `
			<form>
				<input name="" />
			</form>
		`;

		const formNode = /** @type {HTMLFormElement} */ (
			document.querySelector('form')
		);

		deepEqual(getFormPayload(formNode), {});
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
					type="${ControlType.TEXT}"
					name="${FormPayloadKey.NAME}"
					value="${formPayload.name}"
				/>
				<input
					type="${ControlType.DATE}"
					name="${FormPayloadKey.BIRTHDAY}"
					value="${BIRTHDAY_DATE}"
				/>
				<input
					type="${ControlType.CHECKBOX}"
					name="${FormPayloadKey.HAS_FRIENDS}"
					${formPayload.hasFriends ? 'checked' : ''}
				/>
				<input
					type="${ControlType.NUMBER}"
					name="${FormPayloadKey.FRIENDS_COUNT}"
					value="${formPayload.friendsCount}"
				/>
				<fieldset name="${FormPayloadKey.MAIN_FRIEND}">
					<input
						type="${ControlType.TEXT}"
						name="${FormPayloadKey.MAIN_FRIEND_NAME}"
						value="${formPayload.mainFriend.name}"
					/>
				</fieldset>
			</form>
		`;

		const formNode = /** @type {HTMLFormElement} */ (
			document.querySelector('form')
		);

		deepEqual(getFormPayload(formNode), formPayload);
	});
});
