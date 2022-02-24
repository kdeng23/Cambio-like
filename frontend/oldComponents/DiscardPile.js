import React from "react";

function LastDiscard (props) {
    if(props.stick){
        return (
            <div>
                Last Discard: <button onClick={props.handleStick}>Stick: {props.last_discard}</button> 
            </div>
        )
    }
    return(<div>Last Discard: {props.last_discard}</div>)
}

class DiscardPile extends React.Component {
    //Display last discarded card
    render(){
        //if(!this.props.stick){
        return (
          <div>
            <button onClick = {this.props.handleDiscard}>Discard</button>
            {LastDiscard(this.props)}
          </div>
        );
    };
  };

export default DiscardPile;