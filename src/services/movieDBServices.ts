interface Movie {
    id: number;
    title: string;
    releaseDate: string;
    posterImage: string;
    description: string;
    backgroundImage: string;
    favorite: boolean;
}

interface MovieData {
    id: number;
    original_title: string;
    release_date: string;
    poster_path: string;
    overview: string;
    backdrop_path: string;
}

const apiToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTJiMjFhZjIwOGM3NjdlNWQ5N2VkNTU3NmFhZTQ0NiIsInN1YiI6IjY0YjNhYjYzMGJiMDc2MDEwYzUxMzAyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9AXLY5DYRKwHKEwzQrPu8Cuuohxn_kZpJdB4nFltsx8';
const apiKey = '952b21af208c767e5d97ed5576aae446';

async function fetchData(url: string): Promise<MovieData[]> {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiToken}`,
        },
    };

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Error fetching data');
    }

    const data = await response.json();
    return data.results as MovieData[];
}

async function getPopularMovies(pageNumber: number): Promise<Movie[]> {
    const url = `https://api.themoviedb.org/3/movie/popular?page=${pageNumber}`;
    const moviesData = await fetchData(url);
    return moviesData.map(transformMovieData);
}

async function getUpcomingMovies(pageNumber: number): Promise<Movie[]> {
    const url = `https://api.themoviedb.org/3/movie/upcoming?page=${pageNumber}`;
    const moviesData = await fetchData(url);
    return moviesData.map(transformMovieData);
}

async function getTopRatedMovies(pageNumber: number): Promise<Movie[]> {
    const url = `https://api.themoviedb.org/3/movie/top_rated?page=${pageNumber}`;
    const moviesData = await fetchData(url);
    return moviesData.map(transformMovieData);
}

async function getSearchMovies(query: string, pageNumber: number): Promise<Movie[]> {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodedQuery}&page=${pageNumber}`;
    const moviesData = await fetchData(url);
    return moviesData.map(transformMovieData);
}

async function getMovieById(movieId: number): Promise<Movie | null> {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching movie data');
        }

        const movieData = await response.json();
        return transformMovieData(movieData);
    } catch (error) {
        return null;
    }
}

export function transformMovieData(movieData: MovieData): Movie {
    return {
        id: movieData.id,
        title: movieData.original_title,
        releaseDate: movieData.release_date,
        posterImage: `https://image.tmdb.org/t/p/original/${movieData.poster_path}`,
        favorite: false,
        description: movieData.overview,
        backgroundImage: movieData.backdrop_path,
    };
}

export { getPopularMovies, getUpcomingMovies, getTopRatedMovies, getSearchMovies, getMovieById };
export type { Movie };
