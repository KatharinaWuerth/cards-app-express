export function getCards() {
  return fetch('cards') //sinnvoll das http wegzulassen, denn wenn man die Anwendung später mal ins richtige Internet stellt, gibt es localhost ja nicht mehr
    .then(response => response.json());
  //    .then(cards => console.log(cards));
}
/*
function showCardById(id) {
  fetch('cards/30')
    .then(response => response.json())
    .then(peter => console.log(peter));
}
*/

export function addNewCard(data) {
  fetch('cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(item => console.log(item));
}

// bei fetch kommt die id als Parameter rein, deshalb ergänze ich sie mit +
export function deleteCard(id) {
  fetch('cards/' + id, {
    method: 'DELETE'
  }).then(response => console.log('Card deleted', response));
}
