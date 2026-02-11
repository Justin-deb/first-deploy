import type { Movie } from "../../models/movie.model";
import MovieCard from "./MovieCard";

export default function MovieList({movies}:{movies:Movie[]}) {
  
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="
        grid gap-4
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
      ">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
