import { myKey, setUserWatchlist, getUserWatchlist } from './data.js';

// Local Storage Functionalities
export function getMoviesFromLocalStorage() {
    if (localStorage.getItem('moviesWatchList')) {
        return JSON.parse(localStorage.getItem('moviesWatchList'));
    }
    return [];
}

export function saveMovieToLocalStorage(imdbId) {
    if (isUnsavedMovie(imdbId)) {
        fetch('https://www.omdbapi.com/?apikey=' + myKey + '&i=' + imdbId)
            .then(response => response.json())
            .then(movieObject => {
                getUserWatchlist().push(movieObject);
                localStorage.setItem('moviesWatchList', JSON.stringify(getUserWatchlist()));
            });
        return true;
    }
    return false;
}

export function removeMovieFromLocalStorage(imdbId) {
    setUserWatchlist(getUserWatchlist().filter(movie => movie.imdbID !== imdbId));
    localStorage.setItem('moviesWatchList', JSON.stringify(getUserWatchlist()));
}

// Common Functionalities
export function isUnsavedMovie(imdbId) { 
    return getUserWatchlist().filter(movie => movie.imdbID === imdbId).length === 0;
}

export function getMovieHtml(movie, index, isWatchlist) {
    const buttonIcon = isWatchlist ? 'minus' : 'plus';
    const buttonText = isWatchlist ? 'Remove' : 'Watchlist';
    return `
    <section class="film">
        <img class="film-img" src="${movie.Poster}" alt="show poster of ${movie.Title}">
        <div class="flex-container-column">
            <div class="flex-container">
                <h2 class="film-name">${movie.Title}</h2>
                <p class="film-rate"> <img class="icon" src="images/star-icon.png" alt="star icon"> ${movie.imdbRating}</p>
            </div>
            <div class="flex-container">
                <p class="film-time">${movie.Runtime}</p>
                <p class="film-categories">${movie.Genre}</p>
                <button id="${index}" class="add-film-btn"> <img class="icon" src="images/${buttonIcon}-icon.png" alt="${buttonIcon} icon"> ${buttonText}</button>
            </div>
            <p class="film-description">${movie.Plot}</p>
        </div>
    </section>
    <hr>`;
}

export function showNotificationMessage(message) {
    let notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.top = '15px';
        notification.style.opacity = '1'; // Fade in
    }, 0);
    
    setTimeout(() => {
        notification.style.top = '-100px';
        notification.style.opacity = '0'; // Fade out
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 2000);
}
