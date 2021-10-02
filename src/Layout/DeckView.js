import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";

function DeckView() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState({});
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (deckId) {
      async function loadDeck() {
        const response = await readDeck(deckId);
        setDeck(response);
        setCards(response.cards);
      }
      loadDeck();
    }
  }, [deckId]);

  const deleteDeckHandler = (deckId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this deck?"
    );

    if (confirmed) {
      deleteDeck(deckId);
      history.push("/");
    }
  };

  const deleteCardHandler = (cardId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (confirmed) {
        deleteCard(cardId)
      return setCards((current) => {
        return current.filter((card) => card.id !== cardId);
      });
    }
  };

  if (cards.length >= 0) {
    return (
      <div>
        <div className="navigation">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="breadcrumb-item">{deck.name}</li>
            </ol>
          </nav>
        </div>
        <div className="card mb-3">
        <div>
          <h3 className="card-header">{deck.name}</h3>
          <div className="card-body">
            <p className="card-text">{deck.description}</p>
          </div>
          <div className="m-3">
          <Link to={`/decks/${deckId}/edit`}>
            <button className="btn btn-secondary mr-2">Edit</button>
          </Link>
          <Link to={`/decks/${deckId}/study`}>
            <button className="btn btn-primary mr-2" type="button">Study</button>
          </Link>
          <Link to={`/decks/${deckId}/cards/new`}>
            <button className="btn btn-secondary mr-2">Add Cards</button>
          </Link>
          <button className="btn btn-danger mr-2" type="button" onClick={() => deleteDeckHandler(deckId)}>Delete</button>
          </div>
        </div>
        </div>
        <div>
          <h3>Cards</h3>
          {cards.map((card) => (
          <div className="card mb-3" key={card.id}>
           <div className="card-body">
             <h5 className="card-title">{card.name}</h5>
             <h6 className="text-muted">Front</h6>
                <p className="card-text">{card.front}</p>
             <hr/>
             <h6 className="text-muted">Back</h6>
                <p className="card-text">{card.back}</p>
             <div className="d-flex justify-content-end">
              <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                    <button className="btn  btn-secondary mr-2" type="button">
                  Edit
                    </button>
                  </Link>
                  <button className="btn btn-danger" type="button" onClick={() => deleteCardHandler(card.id)}>Delete</button>
             </div>
            </div>
          </div>
         
          ))}
        </div>
      </div>
    );
  }
  return <p>Loading...</p>;
}

export default DeckView;
