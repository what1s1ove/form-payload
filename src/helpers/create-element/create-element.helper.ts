const createElement = (
  tagName: string,
  props?: Partial<HTMLInputElement | HTMLFieldSetElement>,
  ...children: HTMLElement[]
): HTMLElement => {
  const element = document.createElement(tagName);

  if (props) {
    Object.assign(element, props);
  }

  children.forEach((child) => element.append(child));

  return element;
};

export { createElement };
