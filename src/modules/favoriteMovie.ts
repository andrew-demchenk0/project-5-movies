import { displayFavoriteMovies } from './displayFavorites';

export interface CustomSVGElement extends SVGAElement {
    classList: DOMTokenList;
}

export function handleAddToFavorite() {
    const customInputs = Array.from(document.querySelectorAll('.custom-input')) as Array<CustomSVGElement>;
    const favoriteMoviesIds = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
    customInputs.forEach((customInput) => {
        const { movieId } = customInput.dataset;

        customInput.addEventListener('click', () => {
            const isChecked = customInput.classList.contains('active');
            if (isChecked) {
                customInput.classList.remove('active');
                // eslint-disable-next-line no-param-reassign
                customInput.style.fill = '#ff000078';

                const index = favoriteMoviesIds.indexOf(movieId);
                if (index !== -1) {
                    favoriteMoviesIds.splice(index, 1);
                }
            } else {
                customInput.classList.add('active');
                // eslint-disable-next-line no-param-reassign
                customInput.style.fill = 'red';
                favoriteMoviesIds.push(movieId);
            }

            localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMoviesIds));
            displayFavoriteMovies();
        });

        if (favoriteMoviesIds.includes(movieId)) {
            customInput.classList.add('active');
            // eslint-disable-next-line no-param-reassign
            customInput.style.fill = 'red';
        }
    });
}
