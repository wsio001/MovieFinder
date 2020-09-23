import React, { useState, useRef } from 'react';
import './Movie.css';
import noPoster from './assets/posterNotFound.jpg'

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   

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

    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)

    const handleReadMore = () => {
        setReadMore(!readMore);
        executeScroll();
    }

    return(
        <div className = "Movie" ref={myRef}>
            <img className = "Poster" src = {imgLink} alt = "" />
            <h3>{title}</h3>
            <p>Release Date: {releaeDate}</p>
            {!readMore && <p id = "desc" className = "Read-Toggle" onClick = {handleReadMore} ><u>Read more</u></p>}
            {readMore && <p className = "Desc" ><b>Description:</b> {desc}</p>}
            {readMore && <p className = "Read-Toggle" onClick = {handleReadMore} ><u>Read less</u></p>}
        </div>
    )
}

export default Movie;