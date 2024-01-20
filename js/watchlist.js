import { getMovieHtml, removeMovieFromLocalStorage, showNotificationMessage } from './utils.js';
import { myKey, moviesElement, getUserWatchlist } from './data.js';

document.addEventListener('click', e => {
    const elementId = e.target.id;
    
    if (parseInt(elementId) || elementId.startsWith('0')) {
        const movieIndex = parseInt(elementId);
        const imdbId = getUserWatchlist()[movieIndex].imdbID;
        removeMovieFromLocalStorage(imdbId);
        showNotificationMessage('Show is removed!');
        renderWatchlist();
    }
});

function renderWatchlist() {
    if (getUserWatchlist().length !== 0) {
        moviesElement.innerHTML = '';

        getUserWatchlist().forEach((movie, index) => {
            fetch('https://www.omdbapi.com/?apikey=' + myKey + '&i=' + movie.imdbID)
                .then(response => response.json())
                .then(movieObject => {
                    moviesElement.innerHTML += getMovieHtml(movieObject, index, true);
                });
        });
    } else {
        moviesElement.innerHTML = `
            <div class='initial-main-state'>
                <h2 class='initial-text-bigger'> Your watchlist is looking a little empty... </h2>
                <a href='index.html' class='add-film-btn bigger-btn'> <img class='icon' src='images/plus-icon.png' alt='plus icon'> Let's add some movies! </a>
            </div>
        `;
    }
}

renderWatchlist();
