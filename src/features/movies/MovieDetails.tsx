import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieByID } from "../../service/Movies.service";
import type { MovieDB } from "../../models/MovieDB.model";

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDB | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data: MovieDB | undefined = await getMovieByID(id!);
        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070B16] text-white p-6">
        ... Cargando
      </div>
    )
  }

  if (!loading && !movie) {
    return (
      <h3 className="text-4xl text-center">Movie not found!</h3>
    );
  }

  return (
    <div className="">
      <h1 className="text-4xl pl-3">Movie Details</h1>
      <div className="flex justify-center py-10">
        <div className="flex flex-col space-y-8 lg:space-y-0 lg:flex-row bg-neutral-300 rounded-4xl w-400 shadow-2xl px-10 py-4 space-x-4 ">
          <img src={`https://image.tmdb.org/t/p/w500${movie!.poster_path}`} alt="movie poster" className="rounded-3xl " />
          <div className="bg-neutral-400 shadow-2xl rounded-3xl flex-1 pl-3 pt-4 space-y-5">
            <span className="flex items-end space-x-2">
              <p className="text-4xl font-semibold">Movie name:</p>
              <p className="text-5xl ">{movie!.title}</p>
            </span>
            <span className="flex items-start space-x-2">
              <p className="text-4xl font-semibold">Description:</p>
              <p className="text-4xl ">{movie!.overview}</p>
            </span>
            <div className="flex justify-between pr-10 space-x-10 flex-col lg:flex-row">
              <span className="flex items-start space-x-2">
                <p className="text-3xl font-semibold">Release Date:</p>
                <p className="text-3xl ">{movie!.release_date}</p>
              </span>

              <span className="flex items-start space-x-2">
                <p className="text-3xl font-semibold">Is this movie for adults only:</p>
                <p className="text-3xl ">{movie!.forAdults ? ('Yes'):('No')}</p>
              </span>

            </div>
            <div className="flex justify-between pr-10 space-x-10 flex-col lg:flex-row">
              <span className="flex items-start space-x-2">
                <p className="text-3xl font-semibold">Rating:</p>
                <p className="text-3xl ">{movie!.vote_average}/10</p>
              </span>

              <span className="flex items-start space-x-2 ">
                <p className="text-3xl font-semibold">Total votes:</p>
                <p className="text-3xl ">{movie!.vote_count}</p>
              </span>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
