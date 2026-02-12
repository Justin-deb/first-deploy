import type { Movie } from "../../models/movie.model";
import MovieCard from "./MovieCard";

export default function MovieList({movies,isHome=true}:{movies:Movie[],isHome?:boolean}) {
  const rows = isHome ? 3 : 4;
  const gap = isHome ? 20 : 4;
  const style = 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 ' + (isHome ? 'grid gap-20 lg:grid-cols-3':'grid gap-4 lg:grid-cols-4')

  if(isHome){
    movies = movies.slice(0,3);
  }
  
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className={style}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
