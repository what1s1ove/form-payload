const getInputFileValue = (
  inputNode: HTMLInputElement,
): File | File[] | null => {
  return inputNode.files?.[0] ?? null;
};

export { getInputFileValue };
