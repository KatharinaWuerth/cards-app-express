import { createEl } from './utils';
import { get } from './utils';

export class Form {
  constructor(target, onSubmit) {
    this.onSubmit = onSubmit;
    this.el = createEl({
      type: 'form',
      target,
      position: 'afterbegin'
    });
    this.titleInput = this.createInput('title');
    this.descriptionInput = this.createInput('description');
    this.categoryInput = this.createInput('category');

    this.addButton = document.createElement('button');
    this.addButton.innerText = 'Submit';
    this.el.appendChild(this.addButton);

    this.addButton.addEventListener('click', this.onClick.bind(this)); //muss hier this binden, da sonst das this auf den Button bezogen ist und dieser hat kein InputValue --> muss zurück an die Form!
  }
  createInput(placeholder) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', placeholder);
    this.el.appendChild(input);
    return input;
  }
  onClick(event) {
    //event.preventDefault();
    const card = {
      title: this.titleInput.value,
      description: this.descriptionInput.value,
      category: this.categoryInput.value
    };
    this.onSubmit(card);
  }
}
