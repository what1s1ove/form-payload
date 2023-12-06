/**
 * @param {HTMLInputElement} element
 * @returns {Date | null}
 */
const getInputDateValue = (element) => {
	return element.valueAsDate;
};

export { getInputDateValue };
