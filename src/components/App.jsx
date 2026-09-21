import { useState, useEffect } from "react";
import CardGrid from "./CardGrid.jsx";
import Scoreboard from "./Scoreboard.jsx";
import "../styles/App.css";

function shuffleCards(cardsArray) {
  const shuffled = [...cardsArray];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedIds, setClickedIds] = useState([]);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const listResponse = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=12"
        );
        const listData = await listResponse.json();

        const detailedData = await Promise.all(
          listData.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return {
              id: data.id,
              name: data.name,
              image: data.sprites.other["official-artwork"].front_default,
            };
          })
        );

        setCards(shuffleCards(detailedData));
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      }
    }

    fetchPokemon();
  }, []);

  function handleCardClick(id) {
    if (clickedIds.includes(id)) {
      setScore(0);
      setClickedIds([]);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setClickedIds((prevIds) => [...prevIds, id]);

      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    }

    setCards((prevCards) => shuffleCards(prevCards));
  }

  return (
    <div className="app">
      <h1>Memory Card Game</h1>
      <p className="subtitle">Click a card, but don't click it twice!</p>
      <Scoreboard score={score} bestScore={bestScore} />
      <CardGrid cards={cards} onCardClick={handleCardClick} />
    </div>
  );
}

export default App;
