/**
 * @param {HTMLInputElement} inputNode
 * @returns {File[] | File | null}
 */
const getInputFileValue = (inputNode) => {
	const inputFiles = inputNode.files ?? [];

	if (inputNode.multiple) {
		return [...inputFiles];
	}
	const [file] = inputFiles;

	return file ?? null;
};

export { getInputFileValue };
