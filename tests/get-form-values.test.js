import { beforeEach, describe, expect, test } from '@jest/globals';
import { screen } from '@testing-library/dom';

import { BANNED_CONTROL_TYPES } from '../src/common/constants/constants.js';
import { ControlType, ElementName } from '../src/common/enums/enums.js';
import { getFormValues } from '../src/index.js';
import { createElement, createFormElement } from './helpers/helpers.js';

describe('getFormValues should work correctly', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

	test('should skip banned types', () => {
		const bannedElements = BANNED_CONTROL_TYPES.map((type) => {
			return createElement(ElementName.INPUT, {
				name: type,
				type: type,
			});
		});

		document.body.append(createFormElement(...bannedElements));

		const formNode = /** @type {HTMLFormElement} */ (
			screen.queryByRole('form')
		);

		expect(getFormValues(formNode)).toEqual({});
	});

	test('should skip controls without name', () => {
		document.body.append(
			createFormElement(
				createElement(ElementName.INPUT, {
					name: '',
				}),
			),
		);

		const formNode = /** @type {HTMLFormElement} */ (
			screen.queryByRole('form')
		);

		expect(getFormValues(formNode)).toEqual({});
	});

	test('should return the correct object with values', () => {
		const FormPayloadKey = /** @type {const} */ ({
			BIRTHDAY: 'birthday',
			FRIENDS_COUNT: 'friendsCount',
			NAME: 'name',
		});

		const formPayload = {
			[FormPayloadKey.BIRTHDAY]: new Date('1992-06-13'),
			[FormPayloadKey.FRIENDS_COUNT]: 3,
			[FormPayloadKey.NAME]: 'Brad',
		};

		document.body.append(
			createFormElement(
				createElement(ElementName.INPUT, {
					name: FormPayloadKey.NAME,
					type: ControlType.TEXT,
					value: formPayload.name,
				}),
				createElement(ElementName.INPUT, {
					name: FormPayloadKey.FRIENDS_COUNT,
					type: ControlType.NUMBER,
					valueAsNumber: formPayload.friendsCount,
				}),
				createElement(ElementName.INPUT, {
					name: FormPayloadKey.BIRTHDAY,
					type: ControlType.DATE,
					valueAsDate: formPayload.birthday,
				}),
			),
		);

		const formNode = /** @type {HTMLFormElement} */ (
			screen.queryByRole('form')
		);

		expect(getFormValues(formNode)).toEqual(formPayload);
	});

	test('should return the correct nested object with values', () => {
		const FormPayloadKey = /** @type {const} */ ({
			BIRTHDAY: 'birthday',
			FRIENDS_COUNT: 'friendsCount',
			MAIN_FRIEND: 'mainFriend',
			MAIN_FRIEND_NAME: 'friendName',
			NAME: 'name',
		});

		const formPayload = {
			[FormPayloadKey.BIRTHDAY]: new Date('1994-06-13'),
			[FormPayloadKey.FRIENDS_COUNT]: 2,
			[FormPayloadKey.MAIN_FRIEND]: {
				[FormPayloadKey.MAIN_FRIEND_NAME]: 'Jason',
			},
			[FormPayloadKey.NAME]: 'David',
		};

		document.body.append(
			createFormElement(
				createElement(ElementName.INPUT, {
					name: FormPayloadKey.NAME,
					type: ControlType.TEXT,
					value: formPayload.name,
				}),
				createElement(ElementName.INPUT, {
					name: FormPayloadKey.FRIENDS_COUNT,
					type: ControlType.NUMBER,
					valueAsNumber: formPayload.friendsCount,
				}),
				createElement(ElementName.INPUT, {
					name: FormPayloadKey.BIRTHDAY,
					type: ControlType.DATE,
					valueAsDate: formPayload.birthday,
				}),
				createElement(
					ElementName.FIELDSET,
					{
						name: FormPayloadKey.MAIN_FRIEND,
					},
					createElement(ElementName.INPUT, {
						name: FormPayloadKey.MAIN_FRIEND_NAME,
						type: ControlType.TEXT,
						value: formPayload.mainFriend.friendName,
					}),
				),
			),
		);

		const formNode = /** @type {HTMLFormElement} */ (
			screen.queryByRole('form')
		);

		expect(getFormValues(formNode)).toEqual(formPayload);
	});
});
