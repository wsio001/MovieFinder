import React, { useEffect, useState, useRef } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import Row from 'react-bootstrap/Row'
//import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'
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
  const [command, setCommand] = useState(() => {
    return '';
  });

  useEffect(() => {
    if(firstRun.current){
      firstRun.current = false;
      return;
    }
    getMovies();
  }, [query, activePg]);

  const handlePagination = e => {
    console.log("handle page")
    let command = e.target.id
    console.log(command)
    switch(command) {
      case 'first':
        setActivePg(1);
        break;
      case 'last':
        setActivePg(totalPg);
        break;
      case 'prev':
        setActivePg(preActivePg => preActivePg - 1);
        break;
      case 'next':
        setActivePg(preActivePg => preActivePg + 1);
        console.log("active page + 1")
        break;
      default:
        console.log("no command coming in")
    }
  }
  

  const getMovies = async() => {
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
    console.log(data.results);
  }

  const updateSearch = e => {
    console.log(e.target.value)
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault(); //the page will refresh because a component has changes, this line will prevent refresh
    setQuery(search);
    setActivePg(1);
    setSearch('');
  }

  return(
    <div className = "App">
      <h1 className = 'Title' ><b>Find your movies</b></h1>
      <Form className = "search-form" onSubmit = {getSearch}>
        <Form.Group controlId="formSearchWord">
          <Form.Control className = "search-bar" type="text" placeholder="Enter Movie Name" value = {search} onChange = {updateSearch}/>
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
      <Pagination>
        <Pagination.First />
        <Pagination.Prev id = "prev" onClick = {handlePagination} value = "prev" disabled = {activePg === 1}/>
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next id = 'next' onClick = {handlePagination} value = "next" disabled = {activePg === totalPg}/>
        <Pagination.Last />
      </Pagination>
    </div>
  );
};

export default App;
