import Deck from "card-deck";
import React from "react";
//import { render } from "react-dom";
import Cambio from "./components/Cambio";
import Hand from "./components/Hand";
import DrawPile from "./components/DrawPile";
import DiscardPile from "./components/DiscardPile";
/*
class Cambio extends React.Component {
  render(){
    return (
      <button onClick = {this.props.onClick}>Cambio!!</button>
    )
  };
};

class Card extends React.Component {
  render(){
    //if(this.props.value === null){return;}
    return (<button onClick = {this.props.onClick}>Card {this.props.pos}: {this.props.value}</button>) 
  };
};

class Hand extends React.Component {
 renderCard(i){
   return <Card onClick = {() => this.props.onClick(i)} pos = {i + 1} value = {this.props.hand[i]}/>
 }
 render(){
  var cardHand = [];
  for(var i = 0; i < this.props.hand.length; i++){
    cardHand.push(this.renderCard(i));
  }
    return (
      <div>{cardHand}</div>
      /*
      <div>
        <div className="card-row">
          {this.renderCard(2)}
          {this.renderCard(3)}
        </div>
        <div className="card-row">
        {this.renderCard(0)}
          {this.renderCard(1)}
        </div>
      </div>
      
    )
  };
};


class DrawPile extends React.Component {
  /*
  Display next card face down
  1. On click, reveal card
  2a. Click on discard pile to discard
  2b. Click on a card in hand to swap
  
  render(){
    if(this.props.swap){
      return (
        <div>
          <button onClick = {this.props.onClick}>Draw</button>
          <div>Currently Drawn: <button>Swap: {this.props.card}</button></div>
        </div>
      )
    }
    return (
      <div>
        <button onClick = {this.props.onClick}>Draw</button>
        <div>Currently Drawn: {this.props.card}</div>
      </div>
    )
  };
};

class DiscardPile extends React.Component {
  //Display last discarded card
  render(){
    if(!this.props.stick){
      return (
        <div>
          <button onClick = {this.props.onClick}>Discard</button>
          <div>Last Discarded: {this.props.card}
          </div>
        </div>
      );
    }
    return (
      <div>
        <button onClick = {this.props.onClick}>Discard</button>
        <div>Last Discarded: <button>Stick: {this.props.card}</button>
        </div>
      </div>
    );
  };
};
*/
class Game extends React.Component {
  /*
  State for turn, different actions for start and end
  */
  //eventHandler
  constructor(props){
    super(props);
    this.state = {
      start: true,
      // Decks
      drawpile: new Deck([]),
      discardpile: new Deck([null]),
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
    };
  };
  onStart(){
    if(!this.state.start){return;}
    /*
    var cards = [
      ["2", "D"],["2", "C"],["2", "H"],["2", "S"],
      ["3", "D"],["3", "C"],["3", "H"],["3", "S"],
      ["4", "D"],["4", "C"],["4", "H"],["4", "S"],
      ["5", "D"],["5", "C"],["5", "H"],["5", "S"],
      ["6", "D"],["6", "C"],["6", "H"],["6", "S"],
      ["7", "D"],["7", "C"],["7", "H"],["7", "S"],
      ["8", "D"],["8", "C"],["8", "H"],["8", "S"],
      ["9", "D"],["9", "C"],["9", "H"],["9", "S"],
      ["10", "D"],["10", "C"],["10", "H"],["10", "S"],
      ["j", "D"],["j", "C"],["j", "H"],["j", "S"],
      ["q", "D"],["q", "C"],["q", "H"],["q", "S"],
      ["k", "D"],["k", "C"],["k", "H"],["k", "S"],
      ["a", "D"],["a", "C"],["a", "H"],["a", "S"],
    ];
    */
    var cards = [
      "2D","2C","2H","2S",
      "3D","3C","3H","3S",
      "4D","4C","4H","4S",
      "5D","5C","5H","5S",
      "6D","6C","6H","6S",
      "7D","7C","7H","7S",
      "8D","8C","8H","8S",
      "9D","9C","9H","9S",
      "tD","tC","tH","tS",
      "jD","jC","jH","jS",
      "qD","qC","qH","qS",
      "kD","kC","kH","kS",
      "aD","aC","aH","aS",
    ];
    var playing_cards = new Deck(cards);
    playing_cards.shuffle();
    this.setState({
      start: false,
      draw: true,
      hand: playing_cards.draw(4),
      drawpile: playing_cards,
      card_selected: null,
    })
  }
  onDrawPileClick(){
    if(!this.state.draw){return;}
    var card = this.state.drawpile.draw(1);
    if(!card){return;} // no cards to draw
    this.setState({
      //actions avaiable
      draw: false,
      swap: false,
      stick: false,
      discard: true,


      last_drawn: card,
      drawpile: this.state.drawpile,
      swapped: false,
      stuck: false,
      card_selected: null,
    })
    
  };
  onDiscardClick(){
    if(!this.state.discard){return;}
    this.setState({
      //actions available
      draw: true,
      swap: false,
      stick: false,
      discard: false,

      discardpile: this.state.discardpile.addToTop(this.state.last_drawn),
      last_discarded: this.state.last_drawn,
      last_drawn: null,

      //stuck: false,
      //swapped: true,
      card_selected: null,
    })
  };

  toggleSwap(){
    //if(this.state.swapped){return;}
    if(this.state.last_drawn === null){return;}
    if(this.state.swap){
      this.setState({
        swap: false,
      })
    }
    else{
      this.setState({
        swap: true,
      })
    }
  }
  toggleStick(){
    if(this.state.last_discarded === null){return;}
    //if(this.state.stuck){return;}
    if(this.state.stick){
      this.setState({
        stick: false,
      })
    }
    else{
      this.setState({
        stick: true,
      })
    }
  }
  onHandClick(i){
    if(this.state.start){return;}
    if(this.state.card_selected == null || this.state.card_selected === i){
      if(!this.state.swapped){
        this.toggleSwap();
      }
      if(!this.state.stuck && this.state.last_discarded !== null){
        this.toggleStick();
      }
    }
    if(this.state.card_selected === i){
      this.setState({
        card_selected: null,
      })
    }
    else{
      this.setState({
        card_selected: i,
      })
    }
  };

  onSwapClick(){
    if(this.state.swapped){return;}
    var card = this.state.hand[this.state.card_selected];
    var new_hand = this.state.hand;
    new_hand[this.state.card_selected] = this.state.last_drawn;
    this.setState({
      swap: false,
      stick: false,

      card_selected: null,
      hand: new_hand,
      last_drawn: card,
      swapped: true,
    })
  };
  onStickClick(){
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

  handScore(){
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
  callCambio(){
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


  render(){
    //diamonds(D), cloves(C), hearts(H), spades(S)
    //2-10, j,q,k,a
    return (
      <div>
        <Cambio 
        onClick = {() => this.callCambio()}
        />
        <button onClick = {() => this.onStart()}>start</button>
        <div>
          <DrawPile
          handleDraw = {() => this.onDrawPileClick()}
          handleSwap = {() => this.onSwapClick()}
          card = {this.state.last_drawn}
          swap = {this.state.swap}
          />
          <DiscardPile
          handleDiscard = {() => this.onDiscardClick()}
          handleStick = {() => this.onStickClick()}
          stick = {this.state.stick}
          last_discard = {this.state.last_discarded}
          />
        </div>
        <div>
          <header1>Your Hand: </header1>
          <Hand
          onClick = {(i) => this.onHandClick(i)}
          hand = {this.state.hand}
          />
        </div>
      
      </div>
    )
  };
};

export default Game;
