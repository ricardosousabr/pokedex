const form = document.querySelector('#search-form');
const boxData = document.querySelector('.pokemon-data');
const inputValue = document.querySelector('.input-value');
const button = document.querySelector('.btn');

async function fetchPokemon(endpoint) {
  const pokemonName = inputValue.value.trim();
  const UrlAPI = 'https://pokeapi.co/api/v2/';
  const returnAPI = await fetch(UrlAPI + endpoint + '/' + pokemonName);
  const response = await returnAPI.json();
  const imageReturn = response.sprites.front_default;
  const nameReturn = response.name;

  // inserir mais de um endpoint na URl
  // uma fução que recebe o endepoint como prametro
  console.log(returnAPI);
  return [nameReturn, imageReturn];
}

async function showPokemon() {
  const [pokeName, pokeImage] = await fetchPokemon('pokemon');
  const pokemonName = document.createElement('span');
  const pokemonImg = document.createElement('img');

  pokemonName.innerHTML = await pokeName;
  pokemonImg.src = await pokeImage;
  boxData.appendChild(pokemonImg);
  boxData.appendChild(pokemonName);
}

function clearPokemonData() {
  boxData.innerHTML = '';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearPokemonData();
  showPokemon();
});

// esrtudar sobre função asincrona
// duas funções uma para buscar o pokemon e outra para inserir ele na tela
// function featch dinamica
