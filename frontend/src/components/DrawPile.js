import React, { useEffect } from "react"
import getDrawnCard from "../get"


export default function DrawPile(props) {
  return (
    <div>
      <button onClick={props.handleDraw}>Draw</button>
    </div>
  )
}