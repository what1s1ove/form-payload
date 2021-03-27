import { ControlType } from '~/common/enums';

const BANNED_CONTROL_TYPES = [
  ControlType.BUTTON,
  ControlType.RESET,
  ControlType.SUBMIT,
] as const;

export { BANNED_CONTROL_TYPES };
