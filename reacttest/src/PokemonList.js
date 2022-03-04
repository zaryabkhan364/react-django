import React from "react";
import "./pokemonList.css";

function pokemonList({ pokemon }) {
  console.log(pokemon);
  return (
    <div className="list">
      <table>
        <tr>
          <td>
            <h5>Pokemons</h5>
          </td>
        </tr>
        {pokemon.map((p) => (
          <tr key={p}>
            <td>{p}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default pokemonList;
