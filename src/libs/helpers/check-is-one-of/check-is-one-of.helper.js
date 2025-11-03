/**
 * @param {unknown} value
 * @param {...unknown} validValues
 * @returns {boolean}
 */
const checkIsOnOf = (value, ...validValues) => {
	return validValues.includes(value);
};

export { checkIsOnOf };
