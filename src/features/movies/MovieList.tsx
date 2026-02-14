import type { MovieDB } from "../../models/MovieDB.model";
import MovieCard from "./MovieCard";

export default function MovieList({movies,isHome=true}:{movies:MovieDB[],isHome?:boolean}) {
  // const rows = isHome ? 3 : 4;
  // const gap = isHome ? 20 : 4;
  const style = 'grid sm:grid-cols-2 md:grid-cols-3 ' + (isHome ? ' gap-20 lg:grid-cols-3':' gap-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8')

  if(isHome){
    movies = movies.slice(0,3);
  }
  
  return (
    <div className="max-w-96 mx-auto sm:max-w-max px-4 py-6 ">
      <div className={style}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
