import React from "react";
//import { getHand } from "../get"
import { useEffect, useState } from "react"

function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card_key);
  }
  return (<button onClick={handleCardClick} > Card {props.pos}: {props.value}</ button>)
}

function Hand(props) {
  const [handComponent, setHandComponent] = useState([]);

  const cardOfHand = (i, card) => {
    return <Card onCardClick={(i) => props.handleHandClick(i)} card_key={i} key={i + 1} pos={i + 1} value={card} />
  }
  // getHand() should return an array of cards, then index cardHand to get value, insert into function cardOfHand
  //var cardHand = getHand();
  /*
  useEffect(() => {
      getHand().then((result) => {
        var hand = [];
        console.log(result);
        for (let i = 0; i < props.length; i++) {
          console.log("added a card to hand");
          hand.push(cardOfHand(i, result.data[i]));
        }
        setHandComponent(hand);
        //console.log(hand);
      })}, []);
    */
  useEffect(
    () => {
      var hand = [];
      for (let i = 0; i < props.length; i++) {
        hand.push(cardOfHand(i, props.hand[i]));
      }
      setHandComponent(hand);
    }, [props.hand]
  )

  return (
    <div>
      {handComponent}
    </div>
  )
}

export default Hand;