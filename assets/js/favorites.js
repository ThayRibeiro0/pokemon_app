// https://www.w3schools.com/jsref/met_document_queryselector.asp
const listWrapper = document.querySelector(".list-wrapper");
const notFoundMessage = document.querySelector("#not-found-message");

// Load favorites from local
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Function to display only favorited Pokémon
function displayFavorites() {
  listWrapper.innerHTML = ""; // Clear the current content

  if (favorites.length === 0) {
    // Show "Choose your pokemon" message if nothing is selected
    notFoundMessage.style.display = "block";
    return;
  }

  // Hide "No favorites added yet!" message
  notFoundMessage.style.display = "none";

// took from pokemon.js for display
  // list of favorited Pokémon and display them
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
// remove button?
    // Add a click event listener to the "Remove" button
    const removeButton = listItem.querySelector(".remove-btn");
    removeButton.addEventListener("click", () => {
      removeFromFavorites(pokemon.id); // Call the remove function
    });

    listWrapper.appendChild(listItem); // Append the item to the list
  });
}

//i need a function to remove if i do not want the pokemon 
// Function to remove a Pokémon from the favorites list
function removeFromFavorites(id) {
  // Filter out the Pokémon to be removed
  const updatedFavorites = favorites.filter((pokemon) => pokemon.id !== id);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
  window.location.reload(); // Reload the page to reflect changes
}

// Call the function to display favorites on page load
displayFavorites();