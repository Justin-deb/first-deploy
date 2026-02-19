import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieByID } from "../../service/Movies.service";
import type { MovieDB } from "../../models/MovieDB.model";
import { CiWarning } from "react-icons/ci";
import GridSpinner from "../loader/GridSpinner";
import { IoIosHome } from "react-icons/io";
import { MdFavoriteBorder,MdFavorite } from "react-icons/md";
import { toast } from "react-toastify";

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDB | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [favorite, setFavorite] = useState<boolean>(false);

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

  const toggleFavorite = () => {
    setFavorite(!favorite);
    if(favorite){
      toast.success('Movie saved successfully',{
        autoClose:1300
      });
    }else{
      toast.clearWaitingQueue();
      toast.success('Movie unsaved successfully',{
        autoClose:1300
      });
    }
  }

  if (loading) {
    return (
      <div className="">
        <GridSpinner loading={loading} />
      </div>
    )
  }

  if (!loading && !movie) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-linear-to-b from-white to-black">
        <h3 className="text-4xl">Movie not found!</h3>
        <CiWarning className="text-9xl" />
        <Link to={'/'} className=" bg-black text-lg text-white px-7 py-3 rounded-2xl hover:bg-neutral-900">Return home</Link>
      </div>
    );
  }

  return (
    <div className="h-auto lg:h-screen">
      <h1 className="text-4xl pl-3">Movie Details</h1>
      <div className="flex justify-center py-10">
        <div className="flex flex-col space-y-8 lg:space-y-0 lg:flex-row bg-neutral-300 rounded-4xl w-400 shadow-2xl px-10 py-4 space-x-4 ">
          <img src={`https://image.tmdb.org/t/p/w500${movie!.poster_path}`} alt="movie poster" className="rounded-3xl " />
          <div className="flex flex-col justify-between bg-neutral-400 shadow-2xl rounded-3xl flex-1 px-3 py-4 ">
            <span className="flex items-end space-x-2">
              <p className="text-4xl font-semibold">Name:</p>
              <p className="text-4xl ">{movie!.title}</p>
            </span>
            {/* sm:flex sm:items-start sm:space-x-2 */}
            <span className="">
              <p className="text-4xl font-semibold">Description:</p>
              <p className="text-4xl px-3 text-neutral-700 pb-5">{movie!.overview}</p>
            </span>
            <div className="grid grid-cols-1 space-y-5 sm:grid-cols-2 sm:space-y-0 pr-10 space-x-10 flex-col lg:flex-row">
              <span className="flex items-start space-x-2">
                <p className="text-3xl font-semibold">Release Date:</p>
                <p className="text-3xl ">{movie!.release_date}</p>
              </span>

              <span className="flex items-end sm:items-start space-x-2">
                <p className="text-3xl font-semibold">Is this movie for adults only:</p>
                <p className="text-3xl ">{movie!.forAdults ? ('Yes') : ('No')}</p>
              </span>

            </div>
            <div className="grid grid-cols-1 space-y-5 sm:grid-cols-2 sm:space-y-0 pr-10 space-x-10 flex-col lg:flex-row">
              <span className="flex items-start space-x-2">
                <p className="text-3xl font-semibold">Rating:</p>
                <p className="text-3xl ">{movie!.vote_average}/10</p>
              </span>

              <span className="flex items-start space-x-2 ">
                <p className="text-3xl font-semibold">Total votes:</p>
                <p className="text-3xl ">{movie!.vote_count}</p>
              </span>
            </div>
            <div className="flex justify-end space-x-5 pr-5">
              {favorite ?
                (<button className="flex items-center space-x-2 px-5 bg-pink-400 text-2xl rounded-md cursor-pointer hover:bg-pink-300" onClick={toggleFavorite}>
                  <p>Remove from favorites</p>
                  <MdFavorite className="pt-1 text-red-700" />
                </button>) :
                (<button className="flex items-center space-x-2 px-5 bg-pink-400 text-2xl rounded-md cursor-pointer hover:bg-pink-300" onClick={toggleFavorite}>
                  <p>Add to favorites</p>
                  <MdFavoriteBorder className="pt-1" />
                </button>)
              }

              <Link to={'/'} className="flex items-center space-x-2 bg-neutral-700 text-2xl rounded-md px-5 hover:bg-neutral-600">
                <p>Return home</p>
                <IoIosHome />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
