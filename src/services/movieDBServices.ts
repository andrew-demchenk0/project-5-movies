interface Movie {
    id: number;
    title: string;
    releaseDate: string;
    posterImage: string;
    description: string;
}

interface MovieData {
    id: number;
    original_title: string;
    release_date: string;
    poster_path: string;
    overview: string;
}

const apiToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTJiMjFhZjIwOGM3NjdlNWQ5N2VkNTU3NmFhZTQ0NiIsInN1YiI6IjY0YjNhYjYzMGJiMDc2MDEwYzUxMzAyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9AXLY5DYRKwHKEwzQrPu8Cuuohxn_kZpJdB4nFltsx8';

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

async function getPopularMovies(): Promise<Movie[]> {
    const url = 'https://api.themoviedb.org/3/movie/popular';
    const moviesData = await fetchData(url);
    return moviesData.map(transformMovieData);
}

async function getUpcomingMovies(): Promise<Movie[]> {
    const url = 'https://api.themoviedb.org/3/movie/upcoming';
    const moviesData = await fetchData(url);
    return moviesData.map(transformMovieData);
}

async function getTopRatedMovies(): Promise<Movie[]> {
    const url = 'https://api.themoviedb.org/3/movie/top_rated';
    const moviesData = await fetchData(url);
    return moviesData.map(transformMovieData);
}

export function transformMovieData(movieData: MovieData): Movie {
    return {
        id: movieData.id,
        title: movieData.original_title,
        releaseDate: movieData.release_date,
        posterImage: `https://image.tmdb.org/t/p/original/${movieData.poster_path}`,
        description: movieData.overview,
    };
}

export { getPopularMovies, getUpcomingMovies, getTopRatedMovies };

export type { Movie };
