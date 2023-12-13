let pokemonRepository = (function () {
// A set of initial Pokemon characters
    let repository = [
        {
            name: 'Bulbasaur',
            height: 0.7,
            types: ['grass', 'poison']
        },
        {
            name: 'Wartortle',
            height: 1,
            types: ['water']
        },
        {
            name: 'Charizard',
            height: 1.7,
            types: ['fire', 'flying']
        },
    ];

//Allows addition of Pokemon characters with correct attributes
    function add(pokemon) {
		if (
			typeof pokemon === "object" &&
			"name" in pokemon &&
			"height" in pokemon &&
			"types" in pokemon
		) {
			repository.push(pokemon);
		} else {
			console.log("pokemon is not correct");//Indicate the wrong data entry
		}
	}

	function getAll() {
		return repository;
	}

	function showDetails(pokemon) {
		console.log(pokemon);
	}
    //Allows list of buttons indicating individual Pokemon character
	function addListItem(pokemon){
		let pokemonList = document.querySelector (".pokemon-list");
		let listpokemon = document.createElement ("li");
		let button = document.createElement ("button");
		button.innerText = pokemon.name;
		button.classList.add("button-class");
		listpokemon.appendChild (button);
		pokemonList.appendChild (listpokemon);
    button.addEventListener("click", function () {
      showDetails(pokemon);
		})
	}
	
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem
	};
  })();

//Addition of a new Pokemon character
pokemonRepository.add({name: "Pikachu", height: 0.3, types: ["electric"]});

console.log(pokemonRepository.getAll());

//List the existing Pokemon characters
pokemonRepository.getAll().forEach(function (pokemon) {
	pokemonRepository.addListItem(pokemon);
});


/*pokemonRepository.getAll().forEach(function(pokemon) {
    document.write('<p>Name: ' + pokemon.name + '</p>');
    document.write('<p>Height: ' + pokemon.height + ' meters</p>');
    document.write('<p>Types: ' + pokemon.types.join(', ') + '</p>');
    document.write('<hr>'); // Separating each Pokemon's details
});*/
