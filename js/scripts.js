let pokemonRepository = (function () {

    let pokemonList = [
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
  
    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
      pokemonList.push(pokemon);
    }
   
    return {
      getAll: getAll,
      add: add
    };

  })();


// Use a forEach funciotn to iterate over each pokemon in the array

pokemonRepository.getAll().forEach(function(pokemon) {
    document.write('<p>Name: ' + pokemon.name + '</p>');
    document.write('<p>Height: ' + pokemon.height + ' meters</p>');
    document.write('<p>Types: ' + pokemon.types.join(', ') + '</p>');
    document.write('<hr>'); // Separating each Pokemon's details
});
