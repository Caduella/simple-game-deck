// Create a variable called pokemonList and assign Pokemon data to it.
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
]
// Use a forEach funciotn to iterate over each pokemon in the array

pokemonList.forEach(function(pokemon) {
    document.write('<p>Name: ' + pokemon.name + '</p>');
    document.write('<p>Height: ' + pokemon.height + ' meters</p>');
    document.write('<p>Types: ' + pokemon.types.join(', ') + '</p>');
    document.write('<hr>'); // Separating each Pokemon's details
});

    

