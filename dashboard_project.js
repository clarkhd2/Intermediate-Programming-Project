// Project 3 Dashboard Script
// This file demonstrates fetching data from a public API,
// handling loading and errors, and adding interactive UI features.

// API endpoint for sample post data
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Get references to important HTML elements
const loadPostsBtn = document.getElementById("loadPostsBtn");
const reloadPostsBtn = document.getElementById("reloadPostsBtn");
const clearPostsBtn = document.getElementById("clearPostsBtn");
const postsContainer = document.getElementById("postsContainer");
const statusMessage = document.getElementById("statusMessage");

// This array stores favorite post IDs selected by the user
let favoritePosts = [];

/**
 * Updates the status message area with text and a visual style.
 * @param {string} message - The text to show to the user
 * @param {string} type - The type of message: default, loading, error, success
 */
function setStatus(message, type = "default") {
  statusMessage.textContent = message;
  statusMessage.className = "status-message";

  if (type === "loading") {
    statusMessage.classList.add("loading");
  } else if (type === "error") {
    statusMessage.classList.add("error");
  } else if (type === "success") {
    statusMessage.classList.add("success");
  }
}

/**
 * Clears all displayed post cards from the page.
 */
function clearPosts() {
  postsContainer.innerHTML = "";
  setStatus("Post data has been cleared.", "success");
}

/**
 * Toggles whether a post is saved as a favorite.
 * @param {number} postId - The ID of the post being favorited/unfavorited
 * @param {HTMLElement} badgeElement - The badge area for visual feedback
 */
function toggleFavorite(postId, badgeElement) {
  if (favoritePosts.includes(postId)) {
    favoritePosts = favoritePosts.filter(id => id !== postId);
    badgeElement.textContent = "";
  } else {
    favoritePosts.push(postId);
    badgeElement.textContent = "★ Favorite";
  }
}

/**
 * Builds and displays post cards on the page.
 * @param {Array} posts - The array of post objects from the API
 */
function displayPosts(posts) {
  postsContainer.innerHTML = "";

  // If the array is empty, show a no-results message
  if (!posts || posts.length === 0) {
    setStatus("No results found.", "error");
    return;
  }

  // Loop through each post and create a card
  posts.forEach(post => {
    const card = document.createElement("div");
    card.className = "post-card";

    const title = document.createElement("h3");
    title.textContent = post.title;

    const meta = document.createElement("div");
    meta.className = "post-meta";
    meta.textContent = `Post ID: ${post.id} | User ID: ${post.userId}`;

    const details = document.createElement("div");
    details.className = "post-details";
    details.textContent = post.body;

    const buttonRow = document.createElement("div");
    buttonRow.className = "card-buttons";

    const detailsBtn = document.createElement("button");
    detailsBtn.textContent = "See Details";
    detailsBtn.classList.add("secondary");

    // This button expands or collapses the post body
    detailsBtn.addEventListener("click", () => {
      details.classList.toggle("show");
      detailsBtn.textContent = details.classList.contains("show")
        ? "Hide Details"
        : "See Details";
    });

    const favoriteBtn = document.createElement("button");
    favoriteBtn.textContent = "Favorite";
    favoriteBtn.classList.add("favorite-btn");
    favoriteBtn.title = "Save this post as a favorite";

    const favoriteBadge = document.createElement("div");
    favoriteBadge.className = "favorite-badge";

    // This button adds or removes the post from favorites
    favoriteBtn.addEventListener("click", () => {
      toggleFavorite(post.id, favoriteBadge);
    });

    buttonRow.appendChild(detailsBtn);
    buttonRow.appendChild(favoriteBtn);

    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(details);
    card.appendChild(buttonRow);
    card.appendChild(favoriteBadge);

    postsContainer.appendChild(card);
  });

  setStatus("Posts loaded successfully.", "success");
}

/**
 * Fetches post data from the public API using async/await.
 * Includes loading state and error handling with try/catch.
 */
async function fetchPosts() {
  setStatus("Loading data...", "loading");
  postsContainer.innerHTML = "";

  try {
    const response = await fetch(API_URL);

    // If the response is not successful, throw an error
    if (!response.ok) {
      throw new Error("The server returned an error.");
    }

    const data = await response.json();

    // Only show the first 12 posts so the page stays clean
    const selectedPosts = data.slice(0, 12);

    displayPosts(selectedPosts);
  } catch (error) {
    console.error("Fetch error:", error);
    setStatus("Sorry, something went wrong while loading the data.", "error");
  }
}

// Event listener for initial data load
loadPostsBtn.addEventListener("click", fetchPosts);

// Event listener to reload the data
reloadPostsBtn.addEventListener("click", fetchPosts);

// Event listener to clear the displayed cards
clearPostsBtn.addEventListener("click", clearPosts);
