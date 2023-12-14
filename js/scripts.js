let pokemonRepository = (function () {
// Create an initial empty array of Pokemons
   let pokemonList = [];
//Access the Pokemon API
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//Allow a Pokemon with correct attributes to be added
    function add(pokemon) {
		if (
			typeof pokemon === "object" &&
			"name" in pokemon 
		 ) {
			pokemonList.push(pokemon);
		} else {
			console.log("pokemon is not correct");//Indicate the wrong data entry
		}
	}

	function getAll() {
		return pokemonList;
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
//Allow the details of a given Pokemon to be shown by clicking on the button
    button.addEventListener("click", function () {
      showDetails(pokemon);
		})
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
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
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

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
	};
  })();

//List the existing Pokemon characters
pokemonRepository.loadList().then(function () {
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});



