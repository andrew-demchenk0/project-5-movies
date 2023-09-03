import { displayFavoriteMovies } from './displayFavorites';

export interface CustomSVGElement extends SVGAElement {
    classList: DOMTokenList;
}

export function handleAddToFavorite() {
    const customInputs = Array.from(document.querySelectorAll('.custom-input')) as Array<CustomSVGElement>;
    const favoriteMoviesIds = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
    customInputs.forEach((customInput) => {
        const { movieId } = customInput.dataset;
        const updatedCustomInput = customInput.cloneNode(true) as CustomSVGElement;

        updatedCustomInput.addEventListener('click', () => {
            const isChecked = updatedCustomInput.classList.contains('active');
            if (isChecked) {
                updatedCustomInput.classList.remove('active');
                updatedCustomInput.style.fill = '#ff000078';

                const index = favoriteMoviesIds.indexOf(movieId);
                if (index !== -1) {
                    favoriteMoviesIds.splice(index, 1);
                }
            } else {
                updatedCustomInput.classList.add('active');
                updatedCustomInput.style.fill = 'red';
                favoriteMoviesIds.push(movieId);
            }

            localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMoviesIds));
            displayFavoriteMovies();
        });

        if (favoriteMoviesIds.includes(movieId)) {
            updatedCustomInput.classList.add('active');
            updatedCustomInput.style.fill = 'red';
        }

        customInput.replaceWith(updatedCustomInput);
    });
}
