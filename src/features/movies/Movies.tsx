import { useEffect, useState } from "react";
import type { Movie } from "../../models/movie.model";
import MovieList from "./MovieList";
import { getMoviesFromJson } from "../../service/Movies.service";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movies: Movie[] = await getMoviesFromJson();

        setMovies(movies);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();

  }, []);


  return (
    <div className="pt-8 bg-linear-to-b from-white to-black">
      {loading ? (<p>Cargando</p>) : (<MovieList movies={movies!} isHome={false}/>)}
    </div>
  );
}
