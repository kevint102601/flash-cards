import StudyCard from "./StudyCard";
import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";

import { readDeck } from "../../utils/api";
function Study() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({ name: "Loading...", cards: [] });
    const [cardNum, setCardNum] = useState(1)

    useEffect( () => {
        readDeck(deckId).then(setDeck);
    }, [deckId])

    const counter = deck.cards.length;

    function nextHandler() {
        if (cardNum === counter) {
            const goHome = !window.confirm("Click cancel to go back home\n\nClick 'OK' to restart Study Cards.");
            return goHome ? history.push("/") : setCardNum(1);
        };
        setCardNum((previous) => Math.min(counter, previous + 1));
    };

    const titleForCards = `Card ${cardNum} of ${counter}`;
    const card = deck.cards[cardNum - 1];

    if (counter <= 2) {
        return(
        <main className="container study-page">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home" /> Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h1>{deck.name}: Study</h1>
            <h2>Not enough cards</h2>
            <p>
                You need at least 3 cards to study. There are {counter} cards in this
                deck.
            </p>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary"><span className="oi oi-plus" /> Add Cards</Link>
        </main>)
    };

    return (
        <main className="container study-page">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <span className="oi oi-home" /> Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deckId}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Study
              </li>
            </ol>
          </nav>
          <h1>{deck.name}: Study</h1>
            <StudyCard card={card} title={titleForCards} nextHandler={nextHandler}/> 
                
          </main>
    );
}
export default Study;