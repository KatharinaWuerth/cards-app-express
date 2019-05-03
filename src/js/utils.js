export function get(selector, target = document) {
  return target.querySelector(selector);
}

export function getAll(selector, target = document) {
  return target.querySelectorAll(selector);
}

export function createEl({
  type = 'div',
  target = document.body,
  position = 'beforeend',
  innerHTML = ''
}) {
  const el = document.createElement(type);
  el.innerHTML = innerHTML;
  target.insertAdjacentElement(position, el);
  return el;
}
