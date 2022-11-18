const pokemonHTML = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById("loadMoreButton");

const limit = 10;
let offset = 0;
const maxRecords = 151;








loadPokemonItens(offset,limit);



// seção de consumo assincrona da API// 

  
  
    
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
         const convertPokemonToLi = (pokemon) =>{
            return `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}"
                             alt="${pokemon.name}">
                    </div>
                </li>
            `
        }
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}


// evento ao clicar no mais pokemons // 
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
