import React, {useState, useEffect} from 'react'
import {Link, useParams, useHistory} from 'react-router-dom'
import { readCard, readDeck, updateCard  } from "../utils/api/index";
import CardForm from './CardForm';

function CardEdit() {
    const [deck, setDeck] = useState({})
    const [card, setCard] = useState({})
    const { cardId, deckId } = useParams();
    const history = useHistory()

    useEffect(() => {
        if (deckId) {
        async function loadData() {
            const response = await readDeck(deckId);
            const cardResponse = await readCard(cardId)
            setDeck(response)
            setCard(cardResponse)
        }
        loadData();
        }
    }, [deckId, cardId]);


    const changeHandler = (event) => {
            setCard({ ...card, [event.target.name]: event.target.value});
        };
    
    const submitHandler = (event) => {
        event.preventDefault()
        async function cardUpdate() {
            const response = await updateCard(card)
            history.push(`/decks/${deckId}`);
        }
       cardUpdate()
    }

    return (
    <div>
        <div className="navigation">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>Deck {deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
                </ol>
            </nav>
        </div>
            <h4>Edit Card</h4>
            <form onSubmit={submitHandler}>
                <CardForm changeHandler={changeHandler} card={card}/>
                <Link to={`/decks/${deckId}`}>
                    <button type="button" className="btn btn-secondary mx-2">
                        Cancel
                    </button>
                </Link>
                <button className="btn btn-primary"type="submit">Submit</button>
            </form>
    </div>
    )
}

export default CardEdit