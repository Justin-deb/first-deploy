import { Link } from "react-router-dom";
import type { Movie } from "../../models/movie.model";

export default function MovieCard({movie}:{movie:Movie}) {
  return (
    <Link to={`/movies/${movie.id}`} className="group block">
      <article className="rounded-3xl bg-white/5 p-3 shadow-sm ring-1">
        <div className="relative overflow-hidden rounded-2xl">
          <img src={movie.posterUrl} alt="Image" className="" />
          <p>Titulo: {movie.title}</p>
          <p>Descripcion: {movie.description}</p>
        </div>
      </article>
    </Link>
  );
}
