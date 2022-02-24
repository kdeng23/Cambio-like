//import Deck from "card-deck"
Deck = require("card-deck");

const express = require('express');
const app = express();
app.use(express.json());
var cors = require('cors');
const { application } = require('express');
const port = 3001


var cards = [
  "2D", "2C", "2H", "2S",
  "3D", "3C", "3H", "3S",
  "4D", "4C", "4H", "4S",
  "5D", "5C", "5H", "5S",
  "6D", "6C", "6H", "6S",
  "7D", "7C", "7H", "7S",
  "8D", "8C", "8H", "8S",
  "9D", "9C", "9H", "9S",
  "tD", "tC", "tH", "tS",
  "jD", "jC", "jH", "jS",
  "qD", "qC", "qH", "qS",
  "kD", "kC", "kH", "kS",
  "aD", "aC", "aH", "aS",
];

var card_deck = new Deck(cards);
card_deck.shuffle;
var hand = card_deck.draw(4);
var select = "";
var top_drawn_card = "";
var top_discard = "";
var discard_pile = [];

console.log(card_deck._stack);
//var deck = new Deck(cards);
//var shuffled_deck = deck.shuffle();
//===================================================================

app.use(cors())

app.get('/', (req, res) => {
  res.send('Goodbye World!')
})
app.post('/', (req, res) => {
})

//Affect game
app.get('/game', (req, res) => {
  res.send('the game!')

})

app.get('/set-up-game', (req, res) => {
  res.send("Created a shuffled deck, drawn hand");
})
/*
app.get('/create-shuffled-deck', (req, res) => {
  res.send("Created a shuffled deck");
})

app.get('/create-hand', (req, res) => {
  hand = ["aS", "aH", "aC", "2D"];
  res.send("Drawn hand from shuffled deck");
})
*/

app.get('/draw-top-card', (req, res) => {
  top_drawn_card = card_deck.draw();
  res.send(top_drawn_card);
})
app.get('/discard-top-card', (req, res) => {
  discard_pile.unshift(top_drawn_card);
  top_discard = top_drawn_card;
  top_drawn_card = null;
  res.send(top_discard);
})
app.post('/post-selected-card', (req, res) => {
  //console.log('Selecting: ', req.body.select);
  select = req.body.select;
  console.log("Selecting: " + select)
  res.sendStatus(200);
})
app.post('/post-new-hand', (req, res) => {
  hand = req.body.new_hand;
  console.log("New hand: " + req.body.new_hand);
  res.sendStatus(200);
})


//Getters
app.get('/get-hand', (req, res) => {
  res.send(hand);
})
app.get('/get-top-drawn-card', (req, res) => {
  res.send(top_drawn_card);
})

app.get('/get-top-discard', (req, res) => {
  res.send("aD");
})
app.get('/get-selected-card', (req, res) => {
  //var something = { select: select };
  console.log("getSelect:" + select);
  //res.send(select);
  //res.json(something);
  res.send(select.toString());
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})