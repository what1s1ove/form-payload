/**
 * @param {HTMLInputElement} element
 * @returns {File[] | File | null}
 */
const getFileControlElementValue = (element) => {
	const inputFiles = element.files ?? [];

	if (element.multiple) {
		return [...inputFiles];
	}
	const [file] = inputFiles;

	return file ?? null;
};

export { getFileControlElementValue };
