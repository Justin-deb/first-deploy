import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { MovieDB } from "../../models/MovieDB.model";
import { getMovieByName } from "../../service/Movies.service";
import GridSpinner from "../loader/GridSpinner";
import MovieList from "../movies/MovieList";

const SearchMovie = () => {
    const [movie,setMovie] = useState<MovieDB[]>();
    const [movieName,setMovieName] = useState<string>('');
    const [loading,setLoading] = useState<boolean>(true);

    const handleClick = async () =>{
        setLoading(true);
        try {
            const data:MovieDB[] = await getMovieByName(movieName);
            setMovie(data);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const onChangeHandler = (event:HTMLInputElement) => {
        console.log(event.formTarget.valueOf);
        // setMovieName()
    }

    return (
        <div className="bg-linear-to-b from-white to-black">
            <div className="flex justify-center py-10 ">
                <div className="border-2 rounded-4xl text-3xl ">
                    <input type="text" placeholder="Search" className="focus:outline-none pl-3 w-260" onChange={onChangeHandler} value={movieName}/>
                    <button className="border-l-2 px-4 cursor-pointer" onClick={handleClick}>Search</button>
                </div>
            </div>
            
            <MovieList movies={movie!}></MovieList>
        </div>
    )
}

export default SearchMovie