import React, { useState } from 'react';
import './Movie.css';
import noPoster from './assets/posterNotFound.jpg'
const Movie = ({img, title, releaeDate,desc}) => {
    const [imgLink, setImgLink] = useState(() =>{
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
        <div>
            <img className = "poster" src = {imgLink} alt = "" />
            <h3>Title: {title}</h3>
            <p>Release Date: {releaeDate}</p>
            {!readMore && <p onClick = {handleReadMore} ><u>Read more</u></p>}
            {readMore && <p>Description: {desc}</p>}
            {readMore && <p onClick = {handleReadMore} ><u>Read less</u></p>}
        </div>
    )
}

export default Movie;