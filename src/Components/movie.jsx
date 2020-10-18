import React from 'react'


const Movie = ({ match }) => {
    console.log(match)
    return (
        < div >
            <h1>Welcome To {match.params.movie}</h1>
        </div >
    )

}

export default Movie;