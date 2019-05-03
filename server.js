const express = require('express');
const uid = require('uid');
const fs = require('fs');

let cards = readCards();

function readCards() {
  fs.readFile(__dirname + '/cards.json', 'utf8', (err, data) => {
    if (err) {
      console.log('There was an error');
    } else {
      cards = JSON.parse(data);
    }
  });
}

const app = express();
app.use(express.json());
app.use(express.static('./dist'));

app.listen(3000, err => {
  err ? console.log(err) : console.log('Server cards ready');
});

app.get('/cards', (req, res) => {
  res.json(cards);
});

// da id dynamisch ist, ist davor ein :
//von allen Parametern des Objekts, hole ich mir nun die ID
//ich finde auf Array die ID raus und vergleiche mit der eingegebenen id
// zweite Zeile entspricht (war destructuring): const id = req.params.id

app.get('/cards/:id', (req, res) => {
  const { id } = req.params;
  const foundCard = cards.find(card => card.id === id);
  const target = {
    title: foundCard.title,
    description: foundCard.description,
    category: foundCard.category
  };
  res.json(target);
});

app.post('/cards', (req, res) => {
  let newCard = req.body;
  newCard.id = uid();
  cards = [...cards, newCard]; //cards.push(newCard);
  changeCards(cards);
  res.json(newCard);
});

app.delete('/cards/:id', (req, res) => {
  let cardsId = cards.map(card => card.id); //Array mit IDs
  const id = req.params.id; //
  let index = cardsId.indexOf(id);
  cards = [...cards.slice(0, index), ...cards.slice(index + 1)]; //habe sie oben definiert, deshalb hier kein let davor
  res.json(cards);
  changeCards(cards);
});

///die cards.json erwartet ein JSON, deshalb muss ich meinen Array cards mittels JSON.parse(cards) umwandeln
function changeCards(cards) {
  fs.writeFile(__dirname + '/cards.json', JSON.stringify(cards), err => {
    err && console.log('There was an error');
    console.log('File was written');
  });
}
