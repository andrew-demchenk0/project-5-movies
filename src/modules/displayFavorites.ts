import { MovieCard } from './movieCard';
import { getMovieById } from '../services/movieDBServices';

export async function displayFavoriteMovies() {
    const favoriteMoviesContainer = document.getElementById('favorite-movies');
    if (!favoriteMoviesContainer) {
        return;
    }

    const favoriteMoviesData = localStorage.getItem('favoriteMovies');
    if (!favoriteMoviesData) {
        return;
    }

    const favoriteMoviesIds = JSON.parse(favoriteMoviesData) as number[];

    favoriteMoviesContainer.innerHTML = '';

    const favoriteMoviesWithDetails = await Promise.all(favoriteMoviesIds.map((id) => getMovieById(id)));

    favoriteMoviesWithDetails.forEach((movie) => {
        if (movie) {
            // eslint-disable-next-line no-param-reassign
            movie.favorite = true;
            const movieCardHTML = MovieCard(movie);
            favoriteMoviesContainer.insertAdjacentHTML('beforeend', movieCardHTML);
        }
    });

    for (let i = 0; i < favoriteMoviesContainer.children.length; i += 1) {
        favoriteMoviesContainer.children[i].classList.remove('col-lg-3', 'col-md-4', 'col-12');
    }

    if (favoriteMoviesContainer) {
        const customInputs = Array.from(document.querySelectorAll('.favorite'));

        customInputs.forEach((item: any) => {
            item.classList.add('active');
            // eslint-disable-next-line no-param-reassign
            item.style.fill = 'red';
        });
    }

    const favorites = document.querySelectorAll('.favorite');

    favorites.forEach((item: any): any => {
        item.addEventListener('click', () => {
            const favoriteId = item.dataset.movieId;

            if (item.parentElement && item.parentElement.parentElement) {
                item.parentElement.parentElement.remove();
                if (favoriteMoviesData) {
                    const index = favoriteMoviesIds.indexOf(favoriteId);
                    if (index !== -1) {
                        favoriteMoviesIds.splice(index, 1);
                        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMoviesIds));
                    }
                }
                document.querySelectorAll('.custom-input').forEach((e: any) => {
                    const { movieId } = e.dataset;

                    if (favoriteId === movieId) {
                        e.classList.remove('active');
                        e.style.fill = '#ff000078';
                    }
                });
            }
        });
    });
}
