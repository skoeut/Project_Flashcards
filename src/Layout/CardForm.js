import React from 'react'

function CardForm({changeHandler, card}) {
    return (
        <div>
            <div className="mb-3">   
            <label className="form-label">Front</label>
                <textarea
                className="form-control"
                id="front"
                name="front"
                type="text"
                placeholder={card.front}
                value={card.front}
                onChange={changeHandler}
                />
        </div>
        <div className="mb-3">
            <label>Back</label>
                <textarea 
                className="form-control"
                rows="7"
                cols="70"
                id="back"
                name="back"
                type="text"
                placeholder={card.back}
                value={card.back}
                onChange={changeHandler}
                />
        </div>
        </div>
    )
}

export default CardForm