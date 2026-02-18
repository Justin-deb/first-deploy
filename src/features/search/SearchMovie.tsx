import { useEffect, useState, type ReactNode } from "react";
import type { MovieDB } from "../../models/MovieDB.model";
import { getMovieByName } from "../../service/Movies.service";
import GridSpinner from "../loader/GridSpinner";
import MovieList from "../movies/MovieList";

const SearchMovie = () => {
    const [movie, setMovie] = useState<MovieDB[]>();
    const [movieName, setMovieName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(true);

    const bgStyle = ({ isScreenEmpty }: { isScreenEmpty: boolean }): string => {
        return 'bg-linear-to-b from-white to-black ' +
            (isScreenEmpty
                ? 'h-screen'
                : '');
    }

    const [bgStyleString, setBgStyleString] = useState<string>(bgStyle({ isScreenEmpty: true }));

    useEffect(() => {
        if(!movie || movie.length === 0 || searching){
            setBgStyleString(bgStyle({isScreenEmpty:true}));
        }else if(movie){
            setBgStyleString(bgStyle({isScreenEmpty:false}));
        }
    }, [loading,movie,searching]);

    const handleClick = async () => {
        setSearching(false);
        setLoading(true);
        try {
            const data: MovieDB[] = await getMovieByName(movieName);
            setMovie(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.length === 0) setSearching(true);
        setMovieName(event.target.value);
    }

    const listOfMovies = (): ReactNode => {
        if(searching){
            return;
        }
        
        if (loading) {
            return <GridSpinner loading={loading} />
        }

        if ((!movie || movie.length === 0) && !loading) {
            return <p className="text-center text-4xl">No Movies Found</p>
        }

        if (movie && !loading) {
            return <MovieList movies={movie} />
        }

        return <p>Esto es una prueba</p>
    }

    return (
        <div className={bgStyleString}>
            <p className="text-3xl text-center px-10 pt-3">Search a movie you want to learn about</p>
            <div className="flex justify-center py-4 ">
                <div className="border-2 rounded-4xl text-3xl ">
                    <input type="text" placeholder="Search" className="focus:outline-none pl-3 w-260" onChange={onChangeHandler} value={movieName} />
                    <button className="border-l-2 px-4 cursor-pointer hover:bg-neutral-300 hover:rounded-r-4xl" onClick={handleClick}>Search</button>
                </div>
            </div>

            {listOfMovies()}

        </div>
    )
}

export default SearchMovie