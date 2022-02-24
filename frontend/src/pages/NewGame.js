import Deck from "card-deck";
import React, { useState, useEffect } from "react";
//import { render } from "react-dom";
import Start from "../components/Start"
import Cambio from "../components/Cambio";
import Hand from "../components/Hand";
import DrawPile from "../components/DrawPile";
import DiscardPile from "../components/DiscardPile";
import CurrentlyDrawn from "../components/CurrentlyDrawn";
import axios from "axios"
import { setUpGame, drawTopCard, discardTopCard } from "../get.js"
import { getHand, getDrawnCard, getTopDiscard, getSelectedCard } from "../get.js"
import { postSelectedCard, postNewHand } from "../get.js"

const NewGame = () => {
  // Hand
  const [hand, setHand] = useState(["", "", "", ""])
  // const [drawpile, setDrawPile] = useState(new Deck([]));
  // const [discardpile, setDiscardPile] = useState(new Deck([null]));
  const [top_card, setTopCard] = useState(""); // top of draw pile
  const [top_discard, setTopDiscard] = useState(""); // top of discard pile
  const [card_selected, setCardSelected] = useState("default"); // card in hand currently selected

  const [start, setStart] = useState(true);
  const [handCount, setHandCount] = useState(0);
  const [stick, setStick] = useState(false);
  const [draw, setDraw] = useState(false);
  const [swap, setSwap] = useState(false);
  const [discard, setDiscard] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const [stuck, setStuck] = useState(false);

  //useEffect(() => console.log("Set top_card: " + top_card), [top_card]);
  useEffect(() => console.log("Set card_selected: " + card_selected), [card_selected]);
  async function onStart() {
    if (!start) { return; }
    setStart(false);
    setDraw(true);
    //setCardSelected(null);
    //createShuffledDeck();
    //createHand();
    setUpGame();
    setHandCount(4);
    getHand().then((result) => setHand(result.data));
  }

  async function onDrawPileClick() {
    if (!draw) { return; }
    drawTopCard().then((result) => {
      //console.log("drawn card: " + result.data);
      setTopCard(result.data);
      var check_top_card = result.data;
      if (!check_top_card) { return; } // no cards to draw
      //actions avaiable
      setDraw(false);
      setSwap(false);
      setStick(false);
      setDiscard(true);
      setSwapped(false);
      setStuck(false);
      postSelectedCard("").then((result) => setCardSelected(""));
    }
    );
  }

  async function onDiscardClick() {
    //console.log(discard);
    if (!discard) { return; }
    //make request to backend to set top drawn card to top discarded card
    //make request to backend to remove top card
    discardTopCard().then(
      (result) => {
        setTopDiscard(result.data);
        //actions available
        setDraw(true);
        setSwap(false);
        setStick(false);
        setDiscard(false);
        setTopCard(null);
        postSelectedCard("").then((result) => setCardSelected(""));
      }
    );
  };

  async function toggleSwap() {
    //if(this.state.swapped){return;}
    getDrawnCard().then((result) => {
      var card = result.data;
      if (!card) { return; }
      setSwap(prevSwap => !prevSwap);
      //console.log("toggleSwap: ");
      //console.log("rat");
      //console.log(!swap);
    })
  }

  async function toggleStick() {
    getTopDiscard().then(
      (result) => {
        var card = result.data;
        if (!card) { return; }
        setStick(prevStick => !prevStick);
        //console.log("toggleStick: " + card);
      });
  }

  async function onHandClick(i) {
    if (start) { return; }
    /*
    var last_discard = null;
    var selected = null;
    getSelectedCard().then(
      (result) => {
        selected = result.data;
        //console.log("getSelectedCard: " + selected);
        if (selected === "" || selected === null || selected === i) {
          console.log("toggling" + selected);
          getDrawnCard().then(
            (result) => {
              if (!swapped && result.data !== null) { toggleSwap(); }
            }
          )
          getTopDiscard().then(
            (result) => {
              //console.log("getTopDiscard: " + result.data)
              last_discard = result.data;
              if (!stuck && result.data !== null) { toggleStick(); }
            }
          )
        }
        //console.log(card_selected);
        if (selected === i) {
          console.log("if");
          console.log("i: " + i);
          postSelectedCard("");
          //.then(setCardSelected(null));
          // make a delete request: indicating no card is currently selected
        }
        else {
          console.log("else");
          postSelectedCard(i.toString());
          //.then(setCardSelected(i));
          // remove the currently selected card, and select the new card in position i
        }
      }
    )
    */
    if (card_selected === "" || card_selected === null || card_selected === i) {
      console.log("toggling " + top_card + " and card_selected is " + card_selected);
      if (!swapped && top_card !== null) {
        toggleSwap();
        console.log("toggling swap");
      }
      if (!stuck && top_discard !== null) { toggleStick(); }
    }

    if (parseInt(card_selected) === parseInt(i)) {
      console.log("if");
      // console.log("i: " + i + " vs card_selected: " + parseInt(card_selected));
      postSelectedCard("").then(
        setCardSelected(
          (old_select) => old_select = "")
      );
      // make a delete request: indicating no card is currently selected
    }
    else {
      console.log("else");
      console.log("i=" + i + " vs card_selected=" + card_selected);
      // postSelectedCard(i.toString()).then(
      //   setCardSelected(
      //     (old_select) => old_select = i.toString())
      // );
      postSelectedCard(i.toString());
      setCardSelected((old_select) => old_select = i.toString());


      // remove the currently selected card, and select the new card in position i
    }
  };

  function onSwapClick() {
    if (swapped) { return; }
    var card = hand[card_selected];
    console.log("card_selected:" + card_selected);
    console.log("Card: " + card);
    var new_hand = hand;
    new_hand[card_selected] = top_card;
    console.log("Hand: " + hand);
    postNewHand(new_hand).then(
      (result) => {
        setHand(new_hand);
        setSwap(false);
        setStick(false);
        setCardSelected(null);
        //setHand(new_hand);
        //setTopCard(card);
        setSwapped(true);
      }
    )
  };

  if (start) {
    return (
      <div>
        <header>Game</header>
        <Start handleStart={onStart} />
      </div>
    );
  }
  return (
    <div>
      <Cambio />
      <DrawPile handleDraw={onDrawPileClick} />
      <CurrentlyDrawn handleSwap={onSwapClick} swap={swap} top_card={top_card} />
      <DiscardPile stick={stick} top_discard={top_discard} handleDiscard={onDiscardClick} />
      <Hand handleHandClick={(i) => { onHandClick(i) }} hand={hand} length={handCount} />
    </div>
  );
}

/*
function onStickClick(){
  // (success stick) last discarded card and card selected in hand have same face
  if(this.state.stuck){return;}
  var new_hand = this.state.hand;
  if(this.state.last_discarded[0] === this.state.hand[this.state.card_selected][0]){
    var card = this.state.hand[this.state.card_selected];  
    new_hand.splice(this.state.card_selected, 1);
    this.setState({
      hand: new_hand,
      discardpile: this.state.discardpile.addToTop(card),
      last_discarded: card,
    })
  }
  // failed stick
  else{
    new_hand.push(this.state.last_discarded);
    var new_discardpile = this.state.discardpile;
    new_discardpile.draw(1);

    this.setState({
      hand: new_hand,
      discardpile: new_discardpile,
      last_discarded: new_discardpile.top(),
    })
  }
  this.setState({
    card_selected: null,
    stick: false,
    swap: false,
    stuck: true,
  })
};

function handScore(){
  var hand = [];
  for(let i = 0; i < this.state.hand.length; i++){
    hand.push(this.state.hand[i]);
  }
  var total_score = 0;
  for(let i = 0; i < this.state.hand.length; i++){
    var card = hand[i];
    if(card[0] === "k" && (card[1] === "D" || card[1] === "H")){
      total_score -= 1;
    }
    else if(card[0] === "t" || card[0] === "j" || card[0] === "q" || card[0] === "k"){
      total_score += 10;
    }
    else if(card[0] === "a"){
      total_score += 1;
    }
    else{
      total_score += parseInt(card[0]);
    }
  }
  return total_score;
};
function callCambio(){
  if(this.state.start){return;}
  var total_score = this.handScore();
  if(total_score <= 0){
    alert("You win! Score: " + total_score);
  }
  else{
    alert("You lose! Score: " + total_score);
  }
  this.setState({
    start: true,
    // Decks
    drawpile: new Deck([]),
    discardpile: new Deck([]),
    // actions allowed on turn
    stick: false,
    draw: false,
    swap: false,
    discard: false,

    last_drawn: null, // top of draw pile
    last_discarded: null, // top of discard pile

    //actions completed on turn
    swapped: false,
    stuck: false,

    // Hand
    hand: [null, null, null, null],
    card_selected: null, // card in hand currently selected
  })
};
*/

export default NewGame