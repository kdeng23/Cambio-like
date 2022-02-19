import React from "react";

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
      )
    };
  };

  export default Hand;