// Function to display favorites
function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const listWrapper = document.querySelector(".list-wrapper");

  listWrapper.innerHTML = "";

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
      <button class="remove-btn">Remove</button>
    `;

    const removeButton = listItem.querySelector(".remove-btn");
    removeButton.addEventListener("click", () => {
      removeFromFavorites(pokemon.id); // Call the remove function
    });

    listItem.addEventListener("click", () => {
      window.location.href = `./detail.html?id=${pokemon.id}`; // Redirect to detail.html
    });

    listWrapper.appendChild(listItem); // Append the item to the list
  });
}

// Function to remove a Pokémon from the favorites list
function removeFromFavorites(id) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  // Filter out the Pokémon to be removed
  const updatedFavorites = favorites.filter((pokemon) => pokemon.id !== id);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
  window.location.reload(); // Reload the page to reflect changes
}

// Call the function to display favorites on page load
displayFavorites();