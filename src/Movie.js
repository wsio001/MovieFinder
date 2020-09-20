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


    return(
        <div>
            <img className = "poster" src = {imgLink} alt = "" />
            <h3>Title: {title}</h3>
            <p>Release Date: {releaeDate}</p>
            <p>Description: {desc}</p>
        </div>
    )
}

export default Movie;