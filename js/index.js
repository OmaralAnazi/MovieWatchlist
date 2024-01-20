import { getMovieHtml, saveMovieToLocalStorage, showNotificationMessage } from './utils.js';
import { myKey, searchInput, moviesElement } from './data.js';

let currentViewedMovies = null;

document.addEventListener('click', e => {
    const elementId = e.target.id;
    
    if (elementId === 'search-btn') {
        fetchMovies();
    } else if (parseInt(elementId) || elementId.startsWith('0')) {
        const movieIndex = parseInt(elementId);
        const imdbId = currentViewedMovies[movieIndex].imdbID;
        const isAdd = saveMovieToLocalStorage(imdbId);
        const message = isAdd ? 'Show is added!' : 'Show is already added!';
        showNotificationMessage(message);
    }
});

function fetchMovies() {
    const title = searchInput.value;

    fetch('http://www.omdbapi.com/?apikey=' + myKey + '&s=' + title)
        .then(response => {
            if (!response.ok)
                throw Exception('something went wrong');
            return response.json();
        })
        .then(movies => {
            currentViewedMovies = movies.Search;
            renderMovies();
        })
        .catch(err => {
            moviesElement.innerHTML = `
                <div class='initial-main-state'>
                    <p class='initial-text-bigger'> Unable to find what you're looking for. Please try another search. </p>
                </div>
            `;
        });
}

function renderMovies() {
    moviesElement.innerHTML = '';

    currentViewedMovies.forEach((movie, index) => {
        fetch('http://www.omdbapi.com/?apikey=' + myKey + '&i=' + movie.imdbID)
            .then(response => {
                if (!response.ok)
                    throw Exception('something went wrong');
                return response.json();
            })
            .then(movieObject => {
                moviesElement.innerHTML += getMovieHtml(movieObject, index, false);
            });
    });
}
