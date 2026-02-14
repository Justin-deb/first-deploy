import type { Movie } from "../models/movie.model";
import type { MovieDB } from "../models/MovieDB.model";

const MOVIE_URL = "../../data/Movies.json";

const MOVIE_DB_URL = import.meta.env.VITE_MOVIE_DB_URL;
const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_DB_API_KEY;

export async function getMoviesFromJson(): Promise<Movie[]> {
  const res = await fetch(MOVIE_URL);

  if (!res.ok) {
    throw new Error(
      `No se pudo obtener la informacion de movies.json (status ${res.status})`,
    );
  }

  const data: Movie[] = await res.json();

  return data;
}

export async function getMovieByIDFromJson(
  id: number,
): Promise<Movie | undefined> {
  const movies: Movie[] = await getMoviesFromJson();
  let movie: Movie | undefined = undefined;

  movies.find((m) => {
    if (m.id == id) {
      movie = m;
    }
  });

  return movie;
}

export async function getPopularMovies(): Promise<MovieDB[]> {
  const res = await fetch(
    `${MOVIE_DB_URL}/movie/popular?api_key=${MOVIE_API_KEY}`,
  );

  if (!res.ok) {
    throw new Error(
      `Couldn't get movies from the database (status:${res.status})`,
    );
  }

  const data = await res.json();

  return data.results;
}

export async function getMovieByName(name: string): Promise<MovieDB[]> {
  const res = await fetch(
    `${MOVIE_DB_URL}/search/movie?api_key=${MOVIE_API_KEY}&query=${encodeURIComponent(name)}`,
  );

  if (!res.ok) {
    throw new Error(
      `Couldn't get movies from the database (status:${res.status})`,
    );
  }

  const data: MovieDB[] = await res.json();

  return data;
}

export async function getMovieByID(id:string):Promise<MovieDB>{
  const res = await fetch(`${MOVIE_DB_URL}/movie/${id}?api_key=${MOVIE_API_KEY}`);

  if(!res.ok){
    throw new Error(`Couldn't get movies from the database (status:${res.status})`);
  }

  const data:MovieDB = await res.json();

  return data;
}
