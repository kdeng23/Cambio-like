import React, { useState, useEffect } from "react"

export default function CurrentlyDrawn(props) {
    const [currently_drawn, setCurrentlyDrawn] = useState(null);
    useEffect(
        () => {
            if (props.swap) {
                //console.log("dog");
                setCurrentlyDrawn(
                    <div>
                        <div>Currently Drawn: <button onClick={props.handleSwap}> Swap: {props.top_card}</button></div>
                    </div>
                )
            }
            else {
                //console.log("cat");
                setCurrentlyDrawn(<div>Currently Drawn: {props.top_card}</div>)
            }
        },
        [props.swap, props.top_card]
    );
    // useEffect(
    //     () => {
    //         //console.log(1);
    //     }, [props.swap]
    // )
    // useEffect(
    //     () => {
    //         //console.log(2);
    //     }, [props.top_card]
    // )
    return currently_drawn;
}