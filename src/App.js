import "./App.css";
import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onSelect(pokemon)}
      >
        Select
      </Button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      <tbody>
        {Object.keys(base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
};

const Title = styled.h1`
  text-align: center;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-colum-gap: 1rem;
`;
const Container = styled.div`
  margin: auto;
  width: 800px;
  paddingtop: 1rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

const TableTh = styled.th`
  text-align: left;
  font-size: x-large;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      pokemon: [],
      selectedItem: null,
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          ...this.state,
          pokemon: data,
        })
      );
  }

  render() {
    return (
      <Container>
        <Title>Ezt most mindenki láthatja.</Title>
        <Input
          value={this.state.filter}
          onChange={(evt) =>
            this.setState({
              ...this.state,
              filter: evt.target.value,
            })
          }
        />
        <TwoColumnLayout>
          <div>
            <table width="100%">
              <thead>
                <tr>
                  <TableTh>Name</TableTh>
                  <TableTh>Type</TableTh>
                </tr>
              </thead>
              <tbody>
                {this.state.pokemon
                  .filter((pokemon) =>
                    pokemon.name.english
                      .toLowerCase()
                      .includes(this.state.filter)
                  )
                  .slice(0, 20)
                  .map((pokemon) => (
                    <PokemonRow
                      pokemon={pokemon}
                      key={pokemon.id}
                      onSelect={(pokemon) =>
                        this.setState({
                          ...this.state,
                          selectedItem: pokemon,
                        })
                      }
                    />
                  ))}
              </tbody>
            </table>
          </div>
          {this.state.selectedItem && (
            <PokemonInfo {...this.state.selectedItem} />
          )}
        </TwoColumnLayout>
      </Container>
    );
  }
}
/*
useEffect(() => {
  fetch("http://localhost:3000/starting-react/pokemon.json")
    .then((response) => response.json())
    .then((data) => pokemonSet(data));
}, []);
*/
export default App;
