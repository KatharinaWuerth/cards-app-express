import { createEl } from './utils';

export class Form {
  constructor(target) {
    this.el = createEl({
      type: 'form',
      target,
      position: 'afterbegin'
    });
    this.el.innerHTML = `<input type='text' placeholder='title'><input type='text' placeholder='description'><input type='text' placeholder='category'><button>Submit</button>`;
  }
}
