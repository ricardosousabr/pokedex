const form = document.querySelector('#search-form');
const boxData = document.querySelector('.pokemon-data');
const inputValue = document.querySelector('.input-value');
const button = document.querySelector('.btn');
const UrlAPI = 'https://pokeapi.co/api/v2/';
let pokeid = 1;

async function fetchPokemon(pokemon) {
  const returnAPI = await fetch(UrlAPI + 'pokemon' + '/' + pokemon);
  const response = await returnAPI.json();

  return response;
}

function createBtnNextPoke(id) {
  const btnNext = document.createElement('button');
  const idNextPokemon = id + 1;

  btnNext.innerHTML = 'Next';
  btnNext.type = 'click';
  if (idNextPokemon < 906) {
    btnNext.addEventListener('click', () => {
      clearPokemonData();
      showPokemon(idNextPokemon);
    });
  } else {
    btnNext.disabled = true;
  }

  return btnNext;
}

function createBtnBackPoke(id) {
  const btnBack = document.createElement('button');
  const idBackPokemon = id - 1;

  btnBack.innerHTML = 'Back';
  btnBack.type = 'click';
  if (idBackPokemon > 0) {
    btnBack.addEventListener('click', () => {
      clearPokemonData();
      showPokemon(idBackPokemon);
    });
  } else {
    btnBack.disabled = true;
  }

  return btnBack;
}

async function showPokemon(pokemon) {
  const response = await fetchPokemon(pokemon);
  const pokemonName = document.createElement('span');
  const pokemonImg = document.createElement('img');
  const { name, sprites, id } = response;
  const { front_default } = sprites;

  pokemonName.innerHTML = 'Name: ' + name + id;
  pokemonImg.src = front_default;
  boxData.appendChild(pokemonImg);
  boxData.appendChild(pokemonName);
  boxData.appendChild(createBtnBackPoke(id));
  boxData.appendChild(createBtnNextPoke(id));
}

function clearPokemonData() {
  boxData.innerHTML = '';
}

form.addEventListener('submit', (event) => {
  const pokemon = inputValue.value.trim() || pokeid;

  event.preventDefault();
  clearPokemonData();
  showPokemon(pokemon);
});
