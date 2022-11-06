const pokemonHTML = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById("loadMoreButton");

const limit = 5;
let offset = 0;
const maxRecords = 11;






loadPokemonItens(offset,limit);



// seção de consumo assincrona da API// 

  
  
    
function loadPokemonItens(offset,limit){
    
    
    pokeApi.getPokemon(offset,limit).then((pokemons = [])=>{

    const newHTML = pokemons.map((pokemon)=>{
        return `
        <li class = "pokemon ${pokemon.types}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
    
            <div class='detail'>
                <ol class='types'>
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                </ol>
    
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>`
        
    }).join(" ");
    
 /* const listItens = [];
  
  for(let i = 0; i < pokemons.length; i++) {
      
      const pokemon = pokemons[i];
      listItens.push(loadPokemonItens
        (offset,limit));
      console.log(listItens);
      
  }*/
    pokemonList.innerHTML +=  newHTML;

}).catch((error)=>{
console.error(error);

});

};




loadMoreButton.addEventListener("click",()=>{

    offset += limit;
    const qtRecords = offset + limit;

    if(qtRecords >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset,limit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
        return 
    }else{
    loadPokemonItens(offset,limit);
    }    
});