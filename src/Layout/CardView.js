import React, {useState} from 'react'
import {useHistory} from "react-router-dom"

function CardView({ deck, card}) {
const [front, setFront] = useState(true)
const [index, setIndex] = useState(0)
const history = useHistory()

function flipCard(){
  setFront(!front);
  
}

function nextCard(){
  if (index + 1 < deck.cards.length){
      setIndex(index + 1);
      setFront(true);
  } else {
      const result = window.confirm(`Restart cards?
      
      Click 'cancel' to return to the home page.`);
if (result) {
  setIndex(0);
  setFront(true);
  } else {
      history.push("/");
  }
  
  }
}

    return (
    <div>
      <h2>Study: {deck.name}</h2>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Card {index + 1} of {deck.cards.length}</h5>
                        <p className="card-text">{(front) ? `${card[index].front}` : `${card[index].back}`}</p>
                        <button className="btn btn-secondary" onClick={flipCard}>Flip</button> &nbsp;
                        {(front) ? " " : <button className="btn btn-primary" onClick={nextCard}>Next</button>}
                    </div>
                </div>
    </div>
        )
}

export default CardView
