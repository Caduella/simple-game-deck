// Create a variable called pokemonList and assign Pokemon data to it.
var pokemonList = [
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
// Create a for loop to iterate over each pokemon in the array
for (var i = 0; i < pokemonList.length; i++){
    var pokemon = pokemonList[i]; //Select an individual pokemon from the pokemonList array
    
// Add conditional to check if the height is above 1
if (pokemon.height > 1) {
    document.write(pokemon.name + " (height: " + pokemon.height + ") - Wow, that's big! <br>"); 
}
else {document.write(pokemon.name + " (height: " + pokemon.height + ") <br>");
}   
}

    

