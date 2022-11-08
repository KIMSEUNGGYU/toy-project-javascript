export const $ = (selector, $element) => {
  if ($element) {
    return $element.querySelector(selector);
  }

  return document.querySelector(selector);
};

export const $$ = (selector, $element) => {
  if ($element) {
    return $element.querySelectorAll(selector);
  }

  return document.querySelectorAll(selector);
};
