import { createEl } from './utils';

export class Card {
  constructor(target, title, description, category, id) {
    this.el = createEl({
      type: 'div',
      target: target,
      position: 'beforeend'
    });

    this.title = title;
    this.description = description;
    this.category = category;
    this.id = id;

    this.el.innerHTML = `<ul><li>${this.title}</li><li>${
      this.description
    }</li><li>${this.category}</li><li>${this.id}</li></ul>`;
  }
}
