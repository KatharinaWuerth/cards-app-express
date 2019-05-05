import { createEl } from './utils';
import { deleteCard } from './service';

export class Card {
  constructor(target, card) {
    this.el = createEl({
      type: 'form', //hier eine form als type angeben, denn diese hat die Eigenart, dass sie nach einem Abschicken sich neu läd, und das wollen wir, damit die entfernte Karte auch aus dem View verschwindet
      target: target,
      position: 'beforeend'
    });

    this.title = card.title;
    this.description = card.description;
    this.category = card.category;
    this.id = card.id;

    this.el.innerHTML = `<h3>${this.title}</h3><ul><li>${
      this.description
    }</li><li>${this.category}</li><li>${this.id}</li></ul>`;

    this.deleteButton = document.createElement('button');
    this.deleteButton.innerText = 'Delete';
    this.el.appendChild(this.deleteButton);

    this.deleteButton.addEventListener('click', this.onClick.bind(this));
  }
  onClick() {
    deleteCard(this.id);
  }
}
