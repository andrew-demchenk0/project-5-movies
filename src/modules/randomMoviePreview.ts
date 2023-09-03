import { Movie } from '../services/movieDBServices';

const randomMovieContainer = document.getElementById('random-movie');

export function randomMoviePreview(movie: Movie) {
    return `
    <div class="row py-lg-5" style="background-image: url(${movie.posterImage}); background-size: cover; height: 500px; position: relative;">
      <div class="col-lg-6 col-md-8 mx-auto position-absolute top-50 start-50 translate-middle" style="background-color: #2525254f; transform: translate(-50%, -50%);">
        <h1 id="random-movie-name" class="fw-light text-light">${movie.title}</h1>
        <p id="random-movie-description" class="lead text-white">${movie.description}</p>
      </div>
    </div>
  `;
}

export function showRandomMoviePreview(movies: Movie[]) {
    try {
        if (randomMovieContainer && movies && movies.length > 0) {
            const randomIndex = Math.floor(Math.random() * movies.length);
            const randomMovie = movies[randomIndex];
            const previewHTML = randomMoviePreview(randomMovie);
            randomMovieContainer.innerHTML = previewHTML;
        }
    } catch (error) {
        console.error('Error showing random movie preview:', error);
    }
}
