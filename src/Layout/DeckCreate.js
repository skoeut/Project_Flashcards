import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {createDeck} from "../utils/api/index"

function DeckCreate() {
    const [deckForm, setDeckForm] = useState({name: "", description:""})
    const history = useHistory()

    const changeHandler = (event) => {
        setDeckForm({ ...deckForm, [event.target.name]: event.target.value });
      };

    const submitHandler = (event) => {
        event.preventDefault()
        setDeckForm({name:"", description:""})
        async function updateDeck(){
            const response = await createDeck(deckForm)
            history.push(`/decks/${response.id}`)
        }
        updateDeck()
    }

    return (
    <div>
        <div className="navigation">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                    <li className="breadcrumb-item">Create Deck</li>
                </ol>
            </nav>
            </div>
            <h1>Create Deck</h1>
        <div>
        <form onSubmit={submitHandler}>
        <div className="mb-3">
            <label className="form-label"></label>
                Name
                <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                placeholder="Deck Name"
                value={deckForm.name}
                onChange={changeHandler}
                />
        </div>
        <div className="mb-3">
            <label className="form-label"></label>
                Description
                <textarea 
                className="form-control"
                rows="7"
                cols="70"
                id="description"
                name="description"
                type="text"
                placeholder="Brief description of the deck"
                value={deckForm.description}
                onChange={changeHandler}
                />
        </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to={"/"}>
                <button type="button" className="btn btn-secondary mx-2">
                    Cancel
                </button>
            </Link>
        </form>
        </div>
    </div>
    )
}

export default DeckCreate