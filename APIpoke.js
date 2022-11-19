

const pokeApi = {};

function convertPokerAPIDetailToPokemon(pokeDetail){
     var pokemon  = new Pokemon();
    
     pokemon.number = pokeDetail.id
     pokemon.name = pokeDetail.name

     const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);

      type = pokeDetail.types[0].type.name;



    
     pokemon.types = types
     pokemon.type = type;
     pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
     return pokemon;

};


pokeApi.getPokemonDetail = (pokemon) => {
          return fetch(pokemon.url)
               .then((response)=>response.json())
               .then(convertPokerAPIDetailToPokemon)
};

pokeApi.getPokemon = (offset = 0, limit = 10)=>{
    
    const url = `http://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}




