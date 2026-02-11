import { useEffect, useState } from "react";
import type { Movie } from "../../models/movie.model";
import MovieList from "./MovieList";
import { getMovies } from "../../service/Movies.service";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movies: Movie[] = await getMovies();

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
    <div className="mt-8">
      {loading ? (<p>Cargando</p>) : (<MovieList movies={movies!} />)}
    </div>
  );
}
