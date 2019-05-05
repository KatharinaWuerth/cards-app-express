import { CardList } from './CardList';
import { Form } from './Form';
import { addNewCard } from './service';

export class App {
  constructor() {
    const body = document.getElementsByTagName('body')[0];
    body.innerHTML = '';

    console.log(addNewCard);
    this.form = new Form(document.body, addNewCard);
    this.cardList = new CardList();
  }
}
