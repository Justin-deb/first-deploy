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
        const data:MovieDB | undefined = await getMovieByID(id!);
        setMovie(data);
        console.log(await data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }

    loadMovie();
  },[]);

  if(loading){
    return(
      <div className="min-h-screen bg-[#070B16] text-white p-6">
        ... Cargando
      </div>
    )
  }

  if(!loading && !movie){
    return(
      <h3 className="text-4xl text-center">Movie not found!</h3>
    );
  }

  return (
    <div className="mt-grid">
      <h1 className="text-5xl pl-3">Movie Details</h1>
      <div className="">
        {movie?.title}
      </div>
    </div>
  );
}
