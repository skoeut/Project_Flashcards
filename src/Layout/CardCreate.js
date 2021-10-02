import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { readDeck, createCard } from "../utils/api/index";

function CardCreate() {
    const [deck, setDeck] = useState({})
    const [cardForm, setCardForm] = useState({front: "", back: ""})
    const { deckId } = useParams();

    useEffect(() => {
        if (deckId) {
        async function loadDeck() {
            const response = await readDeck(deckId);
            setDeck(response);
        }
        loadDeck();
        }
    }, [deckId]);

    const changeHandler = (event) => {
        setCardForm({ ...cardForm, [event.target.name]: event.target.value });
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setCardForm({front: "", back: ""})
        async function cardCreate(){
            const response = await createCard(deckId, cardForm)
        }
        cardCreate()
    }   

     return (
         <div>
            <div className="navigation">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                    </ol>
                </nav>
            </div>
                <h4>{deck.name}: Add Card</h4>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                    <label className="form-label">Front</label>
                        <textarea
                        className="form-control"
                        id="front"
                        name="front"
                        type="text"
                        placeholder="Front side of card"
                        value={cardForm.front}
                        onChange={changeHandler}
                        />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Back</label>
                        <textarea 
                        className="form-control"
                        rows="7"
                        cols="70"
                        id="back"
                        name="back"
                        type="text"
                        placeholder= "Back side of card"
                        value={cardForm.back}
                        onChange={changeHandler}
                        />
                    </div>
                    <Link to={`/decks/${deckId}`}>
                        <button type="button" className="btn btn-primary">
                            Done
                        </button>
                    </Link>
                    <button className="btn btn-secondary mx-2" type="submit">Save</button>
                </form>
        </div>
     )
}

export default CardCreate