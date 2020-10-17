import React, { useState, useEffect } from 'react'

let url = "https://www.omdbapi.com/?apikey=7d1c1e6c&s=fury";

const Movies = () => {
    useEffect(() => {
        fetchData()
    }, [])

    const [movies, setMovies] = useState([]);
    const fetchData = () => {
        const data = fetch(url)
            .then((res) => res.json())
            .then((movies) => {
                let items = movies.Search;
                console.log(items);
                setMovies(items);
            })

        // const items = await data.json();
    }
    return (
        <div>
            {movies.map((movie) => (
                <h1 key={movie.imdbID} >{movie.Title}</h1>
            ))}
        </div>
    )
}


export default Movies;