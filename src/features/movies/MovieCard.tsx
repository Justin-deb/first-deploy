import { Link } from "react-router-dom";
import type { Movie } from "../../models/movie.model";

export default function MovieCard({movie}:{movie:Movie}) {
  return (
    <Link to={`/movies/${movie.id}`} className="group block ">
      <article className="rounded-3xl bg-[#F6E7BC] p-3 shadow-sm ring-1 hover:bg-neutral-200 h-[35rem]">
        <div className="relative overflow-hidden rounded-2xl p-2 space-y-3">
          <img src={movie.posterUrl} alt="Image" className="rounded-sm w-80 h-96" />
          <p>Titulo: {movie.title}</p>
          <p>Descripcion: {movie.description}</p>
        </div>
      </article>
    </Link>
  );
}
