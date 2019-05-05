import { createEl } from './utils';
import { getCards } from './service';
import { Card } from './Card';

export class CardList {
  constructor() {
    this.el = createEl({
      type: 'div',
      position: 'beforeend'
    });
    getCards().then(cards => this.render(cards)); //then(this.render) -- Funktion render ist nun Parameter vom Promise
  }
  render(cards) {
    cards.forEach(card => new Card(this.el, card));
  }
}
