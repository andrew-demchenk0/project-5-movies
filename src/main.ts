import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, Movie } from './services/movieDBServices';
import { MovieCard } from './modules/movieCard';
import { initializeTabs } from './modules/tabs';

const filmContainer = document.getElementById('film-container');

async function renderMovies(tab: string) {
    try {
        let movies: Movie[];
        switch (tab) {
            case 'popular':
                movies = await getPopularMovies();
                break;
            case 'upcoming':
                movies = await getUpcomingMovies();
                break;
            case 'top_rated':
                movies = await getTopRatedMovies();
                break;
            default:
                movies = await getPopularMovies();
        }

        if (filmContainer) {
            filmContainer.innerHTML = '';
            movies.forEach((movie: Movie) => {
                const movieCardHTML = MovieCard(movie);
                filmContainer.insertAdjacentHTML('beforeend', movieCardHTML);
            });
        }
    } catch (error) {
        console.error('Error getting movies:', error);
    }
}

function handleTabChange(selectedTab: string) {
    renderMovies(selectedTab);
}

initializeTabs(handleTabChange);
renderMovies('popular');
