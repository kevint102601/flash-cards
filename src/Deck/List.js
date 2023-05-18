import React, {useState, useEffect} from "react";
import {Link, useRouteMatch,} from "react-router-dom";
import {listDecks, deleteDeck} from '../utils/api'

function DeckList() {
    const [decks, setDecks] = useState([]);

    useEffect(getDecks, [])

    function deleteHandler(deckId){
        const confirmed = window.confirm('are you sure you want to delete?')
        if (confirmed){
            deleteDeck(deckId).then(getDecks);
        } else { 
            alert('nothing was deleted')
        }
    };

    function getDecks() {
        listDecks().then(setDecks);
    }

    const list = decks.map((deck) =>(
        <li key={deck.id} className="list-group-item list-group-item-action flex-column align-items-start">
            <div>
                <h3>{deck.name}</h3>
                <small>{deck.cards.length} cards </small>
            </div>
            <p>{deck.description}</p>
            <Link className='btn btn-secondary' to={`/decks/${deck.id}`}> <span className="oi oi-eye" />View</Link>
            <Link className='btn btn-primary' to={`/decks/${deck.id}/study`}>  <span className="oi oi-book" /> Study</Link>
            <button type="submit" className='btn btn-danger float-right'id={deck.id} onClick={() => deleteHandler(deck.id)}> <span className="oi oi-trash" />delete</button>
        </li>
    ))

    return (
        <div>
            <Link className="btn btn-secondary" to='/decks/new'><span className="oi oi-plus" />Create Deck</Link>
            <ul className="list-group mt-2 deck-list">
                {list}
            </ul>
        </div>
  );
}
export default DeckList;