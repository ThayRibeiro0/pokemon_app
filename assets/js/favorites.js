const listWrapper = document.querySelector(".list-wrapper");
const notFoundMessage = document.querySelector("#not-found-message");

// Load favorites from localStorage
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function displayFavorites() {
  listWrapper.innerHTML = "";

  if (favorites.length === 0) {
    notFoundMessage.style.display = "block";
    return;
  }

  notFoundMessage.style.display = "none";

  favorites.forEach((pokemon) => {
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
        <div class="number-wrap">
            <p class="caption-fonts">#${pokemon.id}</p>
        </div>
        <div class="img-wrap">
            <img src="${pokemon.img}" alt="${pokemon.name}" />
        </div>
        <div class="name-wrap">
            <p class="body3-fonts">${pokemon.name}</p>
        </div>
        <button class="remove-btn" data-id="${pokemon.id}">Remove</button>
    `;

    const removeButton = listItem.querySelector(".remove-btn");
    removeButton.addEventListener("click", () => {
      removeFromFavorites(pokemon.id);
    });

    listWrapper.appendChild(listItem);
  });
}

function removeFromFavorites(id) {
  const updatedFavorites = favorites.filter((pokemon) => pokemon.id !== id);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  displayFavorites();
}

displayFavorites();