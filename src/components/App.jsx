import { useState, useEffect } from "react";

function App() {
  const [cards, setCards] = useState([]);

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

        setCards(detailedData);
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      }
    }

    fetchPokemon();
  }, []);

  console.log(cards);

  return <h1>Memory Card Game</h1>;
}

export default App;