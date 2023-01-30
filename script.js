//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  episodeList.forEach((episode) => {
    const episodeElem = document.createElement("div");
    episodeElem.classList.add("episode-card");

    // Create title and episode number elements
    const titleElem = document.createElement("h2");
    titleElem.classList.add("episode-title");
    titleElem.textContent = episode.name;

    const episodeNumberElem = document.createElement("p");
    episodeNumberElem.classList.add("episode-code");
    episodeNumberElem.textContent = `S${("0" + episode.season).slice(-2)}E${(
      "0" + episode.number
    ).slice(-2)}`;

    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add("title-wrapper");
    titleWrapper.append(titleElem, episodeNumberElem);

    const episodeImg = document.createElement("img");
    episodeImg.src = episode.image.medium;

    const episodeSummary = document.createElement("p");
    episodeSummary.textContent = episode.summary;

    episodeElem.append(titleWrapper, episodeImg, episodeSummary);
    rootElem.appendChild(episodeElem);
  });
}


// Call the setup function when the page is loaded
window.onload = setup;
