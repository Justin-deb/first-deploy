import type { Movie } from "../models/movie.model";

const MOVIE_URL = "../../data/Movies.json";

export async function getMovies():Promise<Movie[]> {
    const res = await fetch(MOVIE_URL);

    if(!res.ok){
        throw new Error(`No se pudo obtener la informacion de movies.json (status ${res.status})`);
    }

    const data:Movie[] = await res.json();

    return data;
}

export async function getMovieByID(id:number):Promise<Movie | undefined>{
    const movies:Movie[] = await getMovies();
    let movie:Movie|undefined = undefined;

    movies.find((m) => {if(m.id == id){movie = m}});

    return movie;
}