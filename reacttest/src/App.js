import "./App.css";
import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";
import Pokemon from "./Pokemon";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [previousPageUrl, setPreviousPageUrl] = useState();
  const [nextPageUrl, setNextPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(currentPageUrl).then((res) => {
      setLoading(false);
      setNextPageUrl(res.data.next);
      setPreviousPageUrl(res.data.previous);
      setPokemon(res.data.results.map((p) => p.name));
    });
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(previousPageUrl);
  }

  if (loading) return "Loading...";

  return (
    <div className="App">
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={previousPageUrl ? gotoPrevPage : null}
      />
      <Pokemon />
    </div>
  );
}

export default App;
