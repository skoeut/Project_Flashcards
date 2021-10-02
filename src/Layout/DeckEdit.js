import React, {useState, useEffect} from 'react'
import {Link, useParams, useHistory} from 'react-router-dom'
import { readDeck, updateDeck } from "../utils/api/index";

function DeckEdit() {
    const [deck, setDeck] = useState({})
    const { deckId } = useParams();
    const history = useHistory();

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
        setDeck({ ...deck, [event.target.name]: event.target.value });
    };

    const submitHandler = (event) => {
        event.preventDefault()
        console.log('Submitted:', deck)
        async function deckUpdate() {
            const response = await updateDeck(deck)
            history.push(`/decks/${deckId}`);
        }
       deckUpdate()
    }   

     return (
         <div>
            <div className="navigation">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                    </ol>
                </nav>
            </div>
            <div>
                <h2>Edit Deck</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                    <label>Name</label>
                        <textarea
                        className="form-control"
                        id="name"
                        name="name"
                        type="text"
                        placeholder={deck.name}
                        value={deck.name}
                        onChange={changeHandler}
                        />
                    </div>
                    <div className="mb-3">
                    <label>Description</label>
                        <textarea
                        className="form-control"
                        rows="7"
                        cols="70"
                        id="description"
                        name="description"
                        type="text"
                        placeholder={deck.description}
                        value={deck.description}
                        onChange={changeHandler}
                        />
                    </div>
                    <Link to={`/decks/${deckId}`}>
                        <button type="button" className="btn btn-secondary mx-2">
                            Cancel
                        </button>
                    </Link>
                    <button className="btn btn-primary"type="submit">Submit</button>
                </form>
            </div>
        </div>
     )
}

export default DeckEdit