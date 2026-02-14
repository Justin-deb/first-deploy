import { useEffect, useState } from "react";
import MovieList from "./MovieList";
import { getPopularMovies } from "../../service/Movies.service";
import type { MovieDB } from "../../models/MovieDB.model";

export default function Movies() {
  const [movies, setMovies] = useState<MovieDB[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movies: MovieDB[] = await getPopularMovies();

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
