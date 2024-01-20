import { getMoviesFromLocalStorage } from './utils.js';

export const myKey = 'c8277e76'; // public key.. no need to secure it
export const moviesElement = document.getElementById('movies');
export const searchInput = document.getElementById('search-input');

let userWatchlist = getMoviesFromLocalStorage();

export function setUserWatchlist(newValue) {
    userWatchlist = newValue;
} 

export function getUserWatchlist() {
    return userWatchlist;
} 
