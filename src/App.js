import React, { useEffect, useState, useRef } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import Row from 'react-bootstrap/Row'
//import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {key} from './key.js';
import Movie from './Movie.js';


import './App.css';

const App = () => {

  const API_KEY = key
  const firstRun = useRef(true);
  const [movies, setMovies] = useState(()=>{
    return [];
  });
  const [search, setSearch] = useState(()=> {
    return '';
  });
  const [query, setQuery] = useState(() => {
    return '';
  });  
  const [msg, setMsg] = useState(() => {
    return '';
  });

  useEffect(() => {
    if(firstRun.current){
      firstRun.current = false;
      return;
    }
    getMovies();
  }, [query]);

  const getMovies = async() => {
    console.log(query)
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    if(data.total_results === 0){
      setMsg("Sorry, we cannot find any results.")
      return;
    }

    setMovies(data.results);
    console.log(data.results)
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault(); //the page will refresh because a component has changes, this line will prevent refresh
    setQuery(search);
    setSearch('');
  }

  return(
    <div className = "App">
      <h1 className = 'Title' ><b>Find your movies</b></h1>
      <Form className = "search-form" onSubmit = {getSearch}>
        <Form.Group controlId="formSearchWord">
          <Form.Control className = "search-bar" type="text" placeholder="Enter Movie Name" value = {search} onChange = {updateSearch} required/>
        </Form.Group>
        <Button className = "search-button" type = 'submit' size = 'sm'>
          Search
        </Button>
      </Form>
      {
        msg.length>0?
        msg:
        null
      }
      {movies.map(movie =>(
        <Movie 
        key = {movie.id}
        img = {movie.poster_path}
        title = {movie.title}
        releaeDate = {movie.release_date}
        desc = {movie.overview}
        />
      ))}

    </div>
  );
};

export default App;
