import { useEffect, useState } from "react";
import { getPopularMovies } from "../../service/Movies.service";
import MovieList from "../movies/MovieList";
import { Link } from "react-router-dom";
import type { MovieDB } from "../../models/MovieDB.model";

export function Home() {
  const [movies,setMovies] = useState<MovieDB[]>();
  const [loading,setLoading] = useState<boolean>(true);

  useEffect(() =>{
    const loadMovies = async () =>{
      try {
        setMovies(await getPopularMovies());
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }

    loadMovies();
  },[]);


  return (
    <div className="bg-linear-to-b from-white to-black space-y-5 ">
      <h1 className="text-center text-5xl">Welcome to the Movie catalog web page</h1>
      <p className="text-center text-3xl">Here are some movies you can learn about.</p>
      {loading ? <p>loading</p>: <MovieList movies={movies!} />}
      <div className="text-center py-10 ">
        <Link to={'/movies'} className="text-white text-2xl bg-neutral-500 px-5 py-3 rounded-md hover:bg-neutral-600">See all movies</Link>

      </div>
    </div>
  );
}
