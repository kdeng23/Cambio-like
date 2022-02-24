import axios from "axios"
const endpoint = "http://localhost:3001"

//Affect Game
/*
export async function createShuffledDeck() {
    var deck = await axios.get(`${endpoint}/create-shuffled-deck`);
    console.log(deck);
}

export async function createHand() {
    var init_hand = await axios.get(`${endpoint}/create-hand`);
    console.log(init_hand);
}*/

export async function setUpGame() {
    var init_hand = await axios.get(`${endpoint}/set-up-game`);
    console.log("created deck and hand");
}
export async function drawTopCard() {
    var draw_card = await axios.get(`${endpoint}/draw-top-card`);
    console.log("drawn the top card");
    return draw_card;
}
export async function discardTopCard() {
    var discarded_card = await axios.get(`${endpoint}/discard-top-card`);
    console.log("discarded top card");
    return discarded_card;
}
export async function postSelectedCard(card_selected) {
    //  console.log("card_selected: " + card_selected);
    // try {
    //     const select = { select: card_selected };
    //     await axios.post(`${endpoint}/post-selected-card`, select);
    //     console.log("posted selected card")
    // }
    // catch (err) {
    //     console.log("error");
    // }
    //console.log("in postSelectedCard, card_selected = " + card_selected)
    const select = { select: card_selected };
    await axios.post(`${endpoint}/post-selected-card`, select);
    console.log("posted selected card");
}
export async function postNewHand(new_hand) {
    const hand = { new_hand: new_hand }
    await axios.post(`${endpoint}/post-new-hand`, hand);
    console.log("posted new hand");
}


//Getters
export async function getHand() {
    var hand = await axios.get(`${endpoint}/get-hand`);
    //console.log(hand);
    return hand;
}
export async function getDrawnCard() {
    var drawn_card = await axios.get(`${endpoint}/get-top-drawn-card`);
    //console.log("getDrawnCard: " + drawn_card.data);
    return drawn_card;
}

export async function getTopDiscard() {
    var discard = await axios.get(`${endpoint}/get-top-discard`);
    //console.log("getDiscard: " + discard.data);
    return discard;
}
export async function getSelectedCard() {
    try {
        var selected_card = await axios.get(`${endpoint}/get-selected-card`);
        console.log("getSelectedCard: " + selected_card.data);
        return selected_card;
    }
    catch (err) {
        console.log(err, "getSelect error");
    }
}
//onDrawpileClick
//onDiscardClick
//onHandClick
//toggleSwap
//ToggleStick
//onSwapClick
//onStickClick
//callCambio