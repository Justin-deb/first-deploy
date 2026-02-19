import { useEffect, useRef, useState, type ReactNode } from "react";
import type { MovieDB } from "../../models/MovieDB.model";
import { getMovieByName } from "../../service/Movies.service";
import GridSpinner from "../loader/GridSpinner";
import MovieList from "../movies/MovieList";
import { IoIosSearch } from "react-icons/io";

const SearchMovie = () => {
    const [movie, setMovie] = useState<MovieDB[]>();
    const [movieName, setMovieName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(true);
    const ref = useRef<HTMLInputElement>(null);

    const bgStyle = ({ isScreenEmpty }: { isScreenEmpty: boolean }): string => {
        return 'bg-linear-to-b from-white to-black ' +
            (isScreenEmpty
                ? 'h-screen'
                : '');
    }

    const [bgStyleString, setBgStyleString] = useState<string>(bgStyle({ isScreenEmpty: true }));

    useEffect(() => {
        if (!movie || movie.length === 0 || searching) {
            setBgStyleString(bgStyle({ isScreenEmpty: true }));
        }else if(movie.length <= 8){
            setBgStyleString(bgStyle({ isScreenEmpty: false }) + ' xl:h-screen');
        } else if (movie) {
            setBgStyleString(bgStyle({ isScreenEmpty: false }));
        }
    }, [loading, movie, searching]);

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
            unfocusInput();
        }
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length === 0) setSearching(true);
        setMovieName(event.target.value);
    }

    const listOfMovies = (): ReactNode => {
        if (searching) {
            return;
        }

        if (loading) {
            return <GridSpinner loading={loading} />
        }

        if ((!movie || movie.length === 0) && !loading) {
            return <p className="text-center text-4xl">No Movies Found</p>
        }

        if (movie && !loading) {
            return <MovieList movies={movie} isHome={false}/>
        }

        return <p></p>
    }

    const keyListener = (event:React.KeyboardEvent) => {
        if(event.key === 'Enter'){
            handleClick();
        }
    };

    const unfocusInput = () => {
        if(ref.current){
            ref.current.blur();
        }
    };


    return (
        <div className={bgStyleString}>
            <p className="text-3xl text-center px-10 pt-3">Search a movie you want to learn about</p>
            <div className="flex justify-center py-4 ">
                <div className="border-2 rounded-4xl text-3xl flex">
                    <input ref={ref} type="text" placeholder="Movie name..." className="focus:outline-none pl-3 w-60 lg:w-223 xl:w-260" onChange={onChangeHandler} value={movieName} onKeyDown={keyListener} />
                    <button className="px-4 my-1 mx-2 cursor-pointer bg-neutral-500 rounded-4xl hover:bg-neutral-600 hover:rounded-r-4xl " onClick={handleClick}>
                        <div className="">
                            <IoIosSearch />
                        </div>
                        
                    </button>
                </div>
            </div>

            {listOfMovies()}

        </div>
    )
}

export default SearchMovie