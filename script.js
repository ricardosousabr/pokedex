const form = document.querySelector('#search-form');
const boxData = document.querySelector('.pokemon-data');
const inputValue = document.querySelector('.input-value');
const button = document.querySelector('.btn');
const UrlAPI = 'https://pokeapi.co/api/v2/';
const urlImgPokemon = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';
let pokeid = 1;

async function fetchPokemon(pokemon) {
  const returnAPI = await fetch(UrlAPI + 'pokemon' + '/' + pokemon);
  const response = await returnAPI.json();

  return response;
}

function createBtnNextPoke(id) {
  const btnNext = document.createElement('button');
  const idNextPokemon = id + 1;

  btnNext.classList.add('btn');
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

  btnBack.classList.add('btn');
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

function createPokemonImg(id) {
  const pokemonImg = document.createElement('img');

  pokemonImg.classList.add('pokemon-img');
  pokemonImg.src = urlImgPokemon + "0".repeat(3-String(id).length) + id + ".png"

  return pokemonImg;
}

async function showPokemon(pokemon) {
  let response;
  try {
    response = await fetchPokemon(pokemon);
  } catch (err) {
    const erro = document.createElement('span');

    erro.innerHTML = 'Pokemon Não encontrado';
    boxData.appendChild(erro);
  }

  const pokemonName = document.createElement('span');
  const boxButton = document.createElement('div');
  const { name, id } = response;

  boxButton.classList.add('box-Button');
  pokemonName.innerHTML = 'Name: ' + name;
  boxData.appendChild(createPokemonImg(id));
  boxData.appendChild(pokemonName);
  boxButton.appendChild(createBtnBackPoke(id));
  boxButton.appendChild(createBtnNextPoke(id));
  boxData.appendChild(boxButton);
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
