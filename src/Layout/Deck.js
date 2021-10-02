import React from 'react'
import { Link } from 'react-router-dom'

function Deck({decks, deleteDeck}) {
    return (
        <div>
            {decks.map((deck) => 
            <div key={deck.id}  className="card my-3"> 
                <div className="card-body">
                <h5 className="card-title" >{deck.name}<span className="badge mx-5" >{deck.cards.length} cards</span></h5> 
                <p className="card-text">{deck.description}</p>
                <Link to={`/decks/${deck.id}`}>
                    <button className="btn  btn-secondary" type="button">
                        View
                    </button>
                </Link>
                <Link to={`/decks/${deck.id}/study`}>
                    <button className="btn btn-primary mx-2" type="button">
                        Study
                    </button>
                </Link>
                    <button className="btn btn-danger" type="button" onClick={() => deleteDeck(deck.id)}>
                        Delete
                    </button>
                </div>
            </div>
            )}
        </div>
    )
}

export default Deck