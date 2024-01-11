//IIFE to populate and access pokemons in the repository
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }
// Create a list of pokemon buttons to launch a Modal
  function addListItem(pokemon) {
    let ulItem = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");
    button.innerText = pokemon.name;

    button.classList.add("button-class");
    listItem.classList.add("list-group-item");
    listItem.appendChild(button);
    ulItem.appendChild(listItem);

    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

//Populate the pokemonList array
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            height: item.height,
            detailsUrl: item.url,          
          };

          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

//Obtain details of each pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;

    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

// Show the details of a given Pokemon in a Modal
    function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      document.querySelector(".modal-title").innerHTML = `<strong> ${pokemon.name} </strong>`;
      document.querySelector(".modal-body").innerHTML = `
      <p><strong>Height:  ${pokemon.height}</strong></p>  
      <img src="${pokemon.imageUrl}" alt="Image of ${pokemon.name}"> `;
    });
  }

//Data for searching for a pokemon
  function updateList(list) {
    document.querySelector(".pokemon-list").innerHTML = ""
    list.forEach(pokemon => {
      addListItem(pokemon);
    });
  }

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    showDetails,
    updateList
  };
})();

//List the existing Pokemon characters
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//Allow a search on a pokemon name
input = document.getElementById('filter_pokemons');

let filterPokemons = function(event){
  keyword = input.value.toLowerCase();
  filtered_pokemons = pokemonRepository.getAll().filter(function(pokemon){
    pokemonName = pokemon.name.toLowerCase();
    return pokemonName.indexOf(keyword) > -1; 
  });
  pokemonRepository.updateList(filtered_pokemons);
}

input.addEventListener('keyup', filterPokemons);