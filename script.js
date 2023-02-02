// Function to initialize the page and display episode information for each episode in the episodeList
function setup() {
  // Call the getAllEpisodes function to get a list of all episodes
  const allEpisodes = getAllEpisodes();

  // Call the makePageForEpisodes function to display episode information for each episode in the list
  makePageForEpisodes(allEpisodes);
}

// Function to create and display episode information for each episode in the episodeList
function makePageForEpisodes(episodeList) {
  // Get the root element to append the episode information to
  const rootElem = document.getElementById("root");

  // Loop through each episode in the episodeList
  episodeList.forEach((episode) => {
    // Create a div element for each episode
    const episodeElem = document.createElement("div");
    episodeElem.classList.add("episode-card");

    // Create title and episode number elements
    // Create a div element to hold the title and episode number
    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add("title-wrapper");

    // Create a h2 element to hold the episode title
    const titleElem = document.createElement("h2");
    titleElem.classList.add("episode-title");
    titleElem.textContent = episode.name;

    // Create a p element to hold the episode code (season and episode number)
    const episodeNumberElem = document.createElement("p");
    episodeNumberElem.classList.add("episode-code");
    episodeNumberElem.textContent = `S${("0" + episode.season).slice(-2)}E${(
      "0" + episode.number
    ).slice(-2)}`;

    // Append the title and episode number elements to the titleWrapper
    titleWrapper.append(titleElem, episodeNumberElem);

    // Create an img element to hold the episode image
    const episodeImg = document.createElement("img");
    episodeImg.src = episode.image.medium;

    // Create a div element to hold the episode summary
    const episodeSummary = document.createElement("div");
    episodeSummary.innerHTML = episode.summary;

    // Append the titleWrapper, episodeImg, and episodeSummary to the episodeElem
    episodeElem.append(titleWrapper, episodeImg, episodeSummary);

    // Append the episodeElem to the rootElem
    rootElem.appendChild(episodeElem);
  });
}

// level 200 : 'live'search

const episodesList = document.getElementById("episodes-list");
const searchInput = document.getElementById("search-input");
const displayCount = document.getElementById("display-count");

let episodeData = [];

fetch("http://www.tvmaze.com/shows/82/game-of-thrones")
  .then((response) => response.json())
  .then((data) => {
    episodeData = data;
    renderEpisodes(data);
  });

function renderEpisodes(episodes) {
  episodesList.innerHTML = "";
  for (let episode of episodes) {
    const episodeEl = document.createElement("li");
    episodeEl.innerHTML = `
      <h3>${episode.name}</h3>
      <p>${episode.summary}</p>
    `;
    episodesList.appendChild(episodeEl);
  }
}

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredEpisodes = episodeData.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
    );
  });
  renderEpisodes(filteredEpisodes);
  displayCount.innerHTML = `Displaying ${filteredEpisodes.length}/${episodeData.length} episodes`;
});

// Call the setup function when the page is loaded
window.onload = setup;
