import React, {useEffect, useState} from 'react'
import {listDecks, deleteDeck} from "../utils/api"
import {Link} from 'react-router-dom'
import Deck from './Deck'

function Home() {
const [decks, setDecks] = useState([])

useEffect(() => {
    async function loadDeck() {
        const response = await listDecks()
        setDecks(response)
    }
    loadDeck()
}, [])

function deleteHandler(deckId) {
    const confirmed = window.confirm('Delete this deck? You will not be able to recover it');

    if (confirmed) {
      deleteDeck(deckId);
      window.location.reload(false);
    }
  };

if(decks.length > 0) {
    return (
        <div className="containter">
            <Link to={"decks/new"}>
                <button className="btn btn-secondary">
                    Create Deck
                </button>
            </Link>
            <Deck decks={decks} deleteDeck={deleteHandler}/>
        </div>
    )
    }
    return <p>Loading...</p>
}

export default Home