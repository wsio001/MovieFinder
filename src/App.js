import React, { useEffect, useState, useRef } from 'react';
import Pagination from '@material-ui/lab/Pagination'
import Grid from '@material-ui/core/Grid'
import {key} from './key.js';
import Movie from './Movie.js';


import './App.css';

const App = () => {

  const API_KEY = key //you can either insert your key here as a string, or make a key.js and type export let key = "INSERTY YOUR KEY";
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
  const [activePg, setActivePg] = useState(() => {
    return 1;
  });
  const [totalPg, setTotalPg] = useState(() => {
    return 1;
  });
  const [showPagination, setShowPagination] = useState(() => {
    return false;
  }); 

  useEffect(() => {
    if(firstRun.current){
      firstRun.current = false;
      return;
    }
    getMovies();
  }, [query, activePg]);

  const handlePagination = (event, value) => {
    console.log(value)
    console.log("handle page")
    setActivePg(value)
  }
  

  const getMovies = async() => {
    if(query === ''){
      setMsg("Please enter a keyword.")
      return;
    }

    console.log(query)
    console.log(activePg)
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${activePg}&include_adult=false`);
    const data = await response.json();
    console.log(activePg);

    if(data.total_results === 0){
      setMsg("Sorry, we cannot find any results.")
      return;
    }

    console.log(data)
    setMovies(data.results);
    setTotalPg(data.total_pages);
    setShowPagination(true);
    console.log(data.results);
  }

  const updateSearch = e => {
    console.log(e.target.value)
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault(); //the page will refresh because a component has changes, this line will prevent refresh
    if (search === ''){
      setMsg("Please enter a keyword")
      return;
    }
    setQuery(search);
    setActivePg(1);
    setSearch('');
  }

  return(
    <div className = "App">
      <h1 className = 'Title' ><b>Find your movies</b></h1>

      <form className = "search-form" onSubmit = {getSearch}>
          <input className = "search-bar" type="text" placeholder="Enter Movie Name" value = {search} onChange = {updateSearch}/> 
        <button className = "search-button" type = 'submit'>
          Search
        </button>
      </form>

      {
        msg.length>0?
        msg:
        null
      }
      <div className = "Movies">
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

     {showPagination && <Grid className = "Pagination" container justify = "center"> 
      <Pagination count={totalPg} 
      shape="rounded" 
      showFirstButton 
      showLastButton
      siblingCount={1}
      boundaryCount={1}
      defaultPage={1}
      onChange={handlePagination}
      page = {activePg}
      />
      </Grid>}
    </div>
  );
};

export default App;
