//IIFE to populate and access pokemons in the repository
let pokemonRepository = (function () {
// Create an initial empty array of Pokemons
  let pokemonList = [];
//Access the Pokemon API
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//Allow a Pokemon with correct attributes to be added
  function add (pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon 
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");//Indicate the wrong data entry
    }
  }

  //Access all pokemons
  function getAll() {
  return pokemonList;
  }

  function updateList(list) {
    document.querySelector(".pokemon-list").innerHTML = ""
    list.forEach(pokemon => {
      addListItem(pokemon);
    });
  }
	
//Create a list of buttons indicating individual Pokemon character
  function addListItem(pokemon){
    let pokemonList = document.querySelector (".pokemon-list");
    let listpokemon = document.createElement ("li");
    let button = document.createElement ("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild (button);
    pokemonList.appendChild (listpokemon);
//Allow the details of a given Pokemon to be shown by clicking on the button, utilizing a modal
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
	}

 // Display loading message on the page
  function showLoadingMessage() {
    let loadingMessage = document.createElement("div");
    loadingMessage.innerText = "Loading...";
    loadingMessage.classList.add("loading-message");
    document.body.appendChild(loadingMessage);
  }

 // Remove loading message from the page
  function hideLoadingMessage() {
    let loadingMessage = document.querySelector(".loading-message");
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }

  
  function loadList() {
    showLoadingMessage(); // Display loading message before fetching data
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage(); // Hide loading message after data is loaded
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          height: item.height,
          detailsUrl: item.url
        };
        add(pokemon);      
      });
    }).catch(function (e) {
       hideLoadingMessage(); // Hide loading message if an error occurs
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
//Show the details of a Pokemon with a modal
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

//Show a modal that displays the details of a selected Pokemon
  function showModal(pokemon) {
    let modalContainer= document.querySelector('#modal-container');

//Clear all existing modal content
    modalContainer.innerHTML= '';

    let modal= document.createElement('div');
    modal.classList.add('modal');

//Close button by clicking 'close'
    let closeButtonElement= document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText= 'close';
    closeButtonElement.addEventListener('click', hideModal);

    //Define Modal components
    let titleElement= document.createElement('h1');
    titleElement.innerText= pokemon.name;

    let imageElement= document.createElement('img');
    imageElement.src= pokemon.imageUrl;

    let contentElement= document.createElement('p');
    contentElement.innerText= 'Height:' + ' ' + pokemon.height;

  
//Add modal elements
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

    //Allow the removal of the modal when clicked outside of the modal
    modalContainer.addEventListener('click', (e) => {
        let target= e.target;
        if(target === modalContainer) {
            hideModal();
        }
    });
}

function hideModal() {
    let modalContainer= document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
}

//Modal removal utilizing ESC key
window.addEventListener('keydown', (e) => {
    let modalContainer= document.querySelector('#modal-container');
    if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
});

  
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    updateList: updateList,
	};
})();

//List the existing Pokemon characters
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
