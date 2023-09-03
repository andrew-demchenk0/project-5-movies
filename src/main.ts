import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

import {
    getPopularMovies,
    getUpcomingMovies,
    getTopRatedMovies,
    getSearchMovies,
    Movie,
} from './services/movieDBServices';
import { MovieCard } from './modules/movieCard';
import { initializeTabs } from './modules/tabs';
import { showRandomMoviePreview } from './modules/randomMoviePreview';

const filmContainer = document.getElementById('film-container');
const searchForm = document.getElementById('searchForm') as HTMLFormElement;
const searchInput = document.getElementById('search') as HTMLInputElement;
const loadMoreButton = document.getElementById('load-more');

let currentPage = 1;
let currentTab = 'popular';
let currentSearchQuery = '';

async function loadMoreMovies(): Promise<void> {
    currentPage += 1;
    console.log('page', currentPage);
    try {
        await renderMovies(currentTab, currentSearchQuery, true, currentPage);
    } catch (error) {
        console.error('Error getting movies:', error);
    }
}

async function renderMovies(tab: string, searchQuery = '', append = false, pageNumber = 1): Promise<void> {
    try {
        currentTab = tab;
        currentSearchQuery = searchQuery.trim();

        let movies: Movie[];

        switch (tab) {
            case 'popular':
                movies = await getPopularMovies(pageNumber);
                break;
            case 'upcoming':
                movies = await getUpcomingMovies(pageNumber);
                break;
            case 'top_rated':
                movies = await getTopRatedMovies(pageNumber);
                break;
            case 'search':
                movies = await getSearchMovies(currentSearchQuery, pageNumber);
                break;
            default:
                movies = await getPopularMovies(pageNumber);
        }

        if (filmContainer) {
            if (!append || pageNumber === 1) {
                filmContainer.innerHTML = ''; // Очищаємо контейнер лише при першому завантаженні або якщо append === false
            }

            movies.forEach((movie: Movie) => {
                const movieCardHTML = MovieCard(movie);
                filmContainer.insertAdjacentHTML('beforeend', movieCardHTML);
            });
            if (movies.length < 20) {
                console.log('Empty movie list for page or < 20 items:', pageNumber);
                if (loadMoreButton !== null) {
                    loadMoreButton.style.display = 'none';
                }
            }

            if (movies.length >= 20) {
                if (loadMoreButton !== null) {
                    loadMoreButton.style.display = 'block';
                }
            }
        }

        showRandomMoviePreview(movies);
    } catch (error) {
        console.error('Error getting movies:', error);
    }
}

function handleTabChange(selectedTab: string) {
    renderMovies(selectedTab);
}

if (loadMoreButton) {
    loadMoreButton.addEventListener('click', loadMoreMovies);
}

function handleSearch(event: Event): void {
    event.preventDefault();
    const searchQuery = searchInput.value;
    currentPage = 1;
    renderMovies('search', searchQuery);
}

searchForm.addEventListener('submit', handleSearch);

initializeTabs(handleTabChange);

renderMovies('popular');
