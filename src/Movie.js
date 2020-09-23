import React, { useState } from 'react';
import './Movie.css';
import noPoster from './assets/posterNotFound.jpg'

const Movie = ({img, title, releaeDate,desc}) => {
    const [imgLink] = useState(() =>{
        if(!img){
           return (noPoster);
        }
        return (`https://image.tmdb.org/t/p/w500${img}`);
    })

    const [readMore, setReadMore] = useState(() => {
        return false;
    }); 

    const handleReadMore = () => {
        setReadMore(!readMore);
    }

    return(
        <div className = "Movie">
            <img className = "Poster" src = {imgLink} alt = "" />
            <h3>{title}</h3>
            <p>Release Date: {releaeDate}</p>
            {!readMore && <p className = "Read-Toggle" onClick = {handleReadMore} ><u>Read more</u></p>}
            {readMore && <p className = "Desc" ><b>Description:</b> {desc}</p>}
            {readMore && <p className = "Read-Toggle" onClick = {handleReadMore} ><u>Read less</u></p>}
        </div>
    )
}

export default Movie;