import { ControlElementType } from '../enums/enums.js';

const BANNED_CONTROL_ELEMENT_TYPES = /** @type {const} */ ([
	ControlElementType.BUTTON,
	ControlElementType.RESET,
	ControlElementType.SUBMIT,
	ControlElementType.IMAGE,
]);

export { BANNED_CONTROL_ELEMENT_TYPES };
