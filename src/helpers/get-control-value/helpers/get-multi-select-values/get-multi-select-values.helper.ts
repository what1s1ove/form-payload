const getMultiSelectValues = (selectNode: HTMLSelectElement): string[] => {
  return Array.from(selectNode.selectedOptions).map((opt) => opt.value);
};

export { getMultiSelectValues };
