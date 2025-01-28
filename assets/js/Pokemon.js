const MAX_POKEMON = 1010;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemons = [];

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
  .then((response) => response.json())
  .then((data) => {
    allPokemons = data.results;
    displayPokemons(allPokemons);
  });

async function fetchPokemonDataBeforeRedirect(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json()
      ),
    ]);
    return true;
  } catch (error) {
    console.error("Failed to fetch Pokemon data before redirect");
  }
}

function displayPokemons(pokemon) {
  listWrapper.innerHTML = "";

  pokemon.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6];
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
    <div class="number-wrap">
        <p class="caption-fonts">#${pokemonID}</p>
    </div>
    <div class="img-wrap">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png" alt="${pokemon.name}" />
    </div>
    <div class="name-wrap">
        <p class="body3-fonts">${pokemon.name}</p>
    </div>
    <button class="favorite-btn" data-id="${pokemonID}" data-name="${pokemon.name}" data-img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png">
        ⭐️ Add to Favorites
    </button>
`;

    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonDataBeforeRedirect(pokemonID);
      if (success) {
        window.location.href = `./detail.html?id=${pokemonID}`;
      }
    });
    // John (1/21 Need to review)
    const favoriteButton = listItem.querySelector(".favorite-btn");
    favoriteButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent redirect on favorite button click
      const pokemonData = {
        id: pokemonID,
        name: pokemon.name,
        img: favoriteButton.dataset.img,
      };
      addToFavorites(pokemonData);
    });
    //-------------------
    listWrapper.appendChild(listItem);
  });
}

searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredPokemons;

  if (numberFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) => {
      const pokemonID = pokemon.url.split("/")[6];
      return pokemonID.startsWith(searchTerm);
    });
  } else if (nameFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm)
    );
  } else {
    filteredPokemons = allPokemons;
  }

  displayPokemons(filteredPokemons);

  if (filteredPokemons.length === 0) {
    notFoundMessage.style.display = "block";
  } else {
    notFoundMessage.style.display = "none";
  }
}

const closeButton = document.querySelector(".search-close-icon");
closeButton.addEventListener("click", clearSearch);

function clearSearch() {
  searchInput.value = "";
  displayPokemons(allPokemons);
  notFoundMessage.style.display = "none";
}
// // John 91/21--------
// function addToFavorites(pokemon) {
//   const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//   if (!favorites.some((fav) => fav.id === pokemon.id)) {
//     favorites.push(pokemon);
//     localStorage.setItem("favorites", JSON.stringify(favorites));
//     alert(`${pokemon.name} added to favorites!`);
//   } else {
//     alert(`${pokemon.name} is already in favorites!`);
//   }
// }
// //------------

// Thays - Add to Favorites
function addToFavorites(pokemon) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.some((fav) => fav.id === pokemon.id)) {
    favorites.push(pokemon);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    showModal("Success 👏!", `${pokemon.name} ✅ added to favorites ⭐️!`);
  } else {
    showModal(
      "Warning! 😕",
      `${pokemon.name} ❌ is already in favorites, do you wish remove it? 🖐️!`,
      pokemon
    );
  }
}

function showModal(title, message, pokemon = null) {
  const modalTitle = document.querySelector("#exampleModalLabel");
  const modalBody = document.querySelector(".modal-body");
  const removeButton = document.querySelector("#removeBtn");

  modalTitle.textContent = title;
  modalBody.textContent = message;

  if (pokemon) {
    removeButton.style.display = "inline-block";
    removeButton.onclick = () => removeFromFavorites(pokemon);
  } else {
    removeButton.style.display = "none";
  }

  $("#alertModal").modal("show");

  document.querySelector("#closeBtn").onclick = function () {
    $("#alertModal").modal("hide");
  };
}

function removeFromFavorites(pokemon) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((fav) => fav.id !== pokemon.id);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  showModal("Removed!", `${pokemon.name} has been removed from favorites!`);
}

//------------
