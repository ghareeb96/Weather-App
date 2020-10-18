import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

let url = "https://www.omdbapi.com/?apikey=7d1c1e6c&s=fury";

const Movies = () => {
    useEffect(() => {
        fetchData()
    }, [])

    const [movies, setMovies] = useState([]);
    const fetchData = () => {
        // fetch(url)
        //     .then((res) => res.json())
        //     .then((movies) => {
        //         let items = movies.Search;
        //         console.log(items);
        //         setMovies(items);
        //     })

        let items = ["Harry Potar", "Game of Thrones", "Dark", "Mr. Robot", "The Witcher", "See"];
        setMovies(items);
    }
    return (
        <div>
            {movies.map((movie, index) => (
                // <Link to={movie.URL} >
                //     <h1 key={movie.imdbID} >{movie.Title}</h1>
                // </Link>

                <Link to={`/movies/${movie} `} key={index}>
                    <h1 > {movie} </h1>
                </Link>
            ))}
        </div>
    )
}


export default Movies;