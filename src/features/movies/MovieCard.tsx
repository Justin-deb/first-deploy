import { Link } from "react-router-dom";
import type { MovieDB } from "../../models/MovieDB.model";

export default function MovieCard({movie}:{movie:MovieDB}) {
  const movieDescription = movie.overview.length > 120 ? movie.overview.slice(0,120) + ' ...Learn more': movie.overview;
  return (
    <div>
      <Link to={`/movies/${movie.id}`} className="group block ">
        <article className="rounded-3xl bg-black  p-3 shadow-sm ring-1 hover:bg-neutral-200 min:h-140">
          <div className="relative overflow-hidden rounded-2xl p-2 space-y-3">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Image" className="rounded-sm w-80 h-96" />
            <p className="text-white text-2xl">{movie.title}</p>
            <p className="text-neutral-600 text-lg">Description: {movieDescription}</p>
          </div>
        </article>
      </Link>
    </div>
  );
}
