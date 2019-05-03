import { Card } from './Card';
//import { CardList } from './CardList';
import { Form } from './Form';

export class App {
  constructor() {
    const body = document.getElementsByTagName('body')[0];
    body.innerHTML = '';

    this.form = new Form();
    //this.cardList = new CardList();
    this.card = new Card();
  }
}
