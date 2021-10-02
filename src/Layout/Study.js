import React, {useState, useEffect} from "react";
import CardView from "./CardView";
import {useParams, Link} from "react-router-dom"
import {readDeck} from "../utils/api"

function Study(){
    const [deck, setDeck] = useState({})
    const [card, setCard] = useState({})
    const {deckId} = useParams() 
  

    useEffect(() => {
        if (deckId) {
        async function loadDeck() {
            const response = await readDeck(deckId)
            setDeck(response)
            setCard(response.cards)
        }
        loadDeck()
    }
    }, [deckId])

    
    const NotEnough = (
        <div>
            <h3>{deck.name}: Study</h3>
            <p>Not enough cards.</p>
            <p>
                You need at least 3 cards to study. There are {card.length} in
                this deck.
            </p>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
        </div>
      );

if (card.length > 2) {
    return (
        <div className="navigation">
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
        </nav>
        <div>
         <CardView deck={deck} card={card}/>  
        </div>
        </div>
    )
    }
    return (
        <div className="navigation">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <div>
                {NotEnough}
            </div>
        </div>
    )
}
export default Study;

