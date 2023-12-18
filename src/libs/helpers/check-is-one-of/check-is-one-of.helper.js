/**
 * @template {unknown} T
 * @param {unknown} value
 * @param {...T} validValues
 * @returns {value is validValues[number]}
 */
const checkIsOnOf = (value, ...validValues) => {
	return /** @type {unknown[]} */ (validValues).includes(value);
};

export { checkIsOnOf };
