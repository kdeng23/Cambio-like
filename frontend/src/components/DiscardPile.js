import React, { useEffect } from "react";

function LastDiscard(props) {
  //console.log(props.stick);
  // useEffect(
  //   () => {
  //     if (props.stick) {
  //       return (
  //         <div>
  //           Last Discard: <button onClick={props.handleStick}>Stick: {props.top_discard}</button>
  //         </div>
  //       )
  //     }
  //     return (<div>Last Discard: {props.top_discard}</div>)
  //   },
  //   [props.stick]
  // )
  if (props.stick) {
    return (
      <div>
        Last Discard: <button onClick={props.handleStick}>Stick: {props.top_discard}</button>
      </div>
    )
  }
  return (<div>Last Discard: {props.top_discard}</div>)
}

function DiscardPile(props) {
  return (
    <div>
      <button onClick={props.handleDiscard}>Discard</button>
      {LastDiscard(props)}
    </div>
  );
}
export default DiscardPile;