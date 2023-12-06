import { ControlType } from '../enums/enums.js';

const BANNED_CONTROL_TYPES = /** @type {const} */ ([
	ControlType.BUTTON,
	ControlType.RESET,
	ControlType.SUBMIT,
	ControlType.IMAGE,
]);

export { BANNED_CONTROL_TYPES };
