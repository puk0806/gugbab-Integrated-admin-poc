export const getFocusable = (selector: HTMLElement | null) => {
  if (!selector) {
    return [];
  }

  return selector.querySelectorAll('a, button, input, textarea, [tabindex="0"]');
};

export function getAttribute(attributeName = '', element?: Element | null) {
  if (!element) {
    return null;
  }

  return element.getAttribute(attributeName) ?? null;
}
