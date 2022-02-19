import React from "react"


class DrawPile extends React.Component {
    render(){
    
    // if swap is available
    if(this.props.swap){
      return (
          <div>
            <button onClick = {this.props.handleClick}>Draw</button>
            <div>Currently Drawn: <button onClick = {this.props.handleSwap}> Swap: {this.props.card}</button></div>
          </div>
        )
      }
      // if swap is unavailable
      return (
        <div>
          <button onClick = {this.props.handleDraw}>Draw</button>
          <div>Currently Drawn: {this.props.card}</div>
        </div>
      )
    };
  };
  
  export default DrawPile;