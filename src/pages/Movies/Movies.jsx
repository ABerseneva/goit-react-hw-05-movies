import { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import api from '../../api/moviesApi';

export default function Movies() {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovieByQuery = async () => {
      const result = await api.getMoviesQuery(query);
      setMovies(result.data.results);
      // console.log(result.data.results);
    };
    fetchMovieByQuery();
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await api.getMoviesDay();
      setMovies(result.data.results);
    };
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    setQuery(event.target.searchfield.value);
    setSearchParams({ query: event.target.searchfield.value });
    event.target.reset();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="searchfield"
            type="text"
            autoComplete="off"
            placeholder="Search movies"
          />
          <button type="submit" className="button">
            Search
          </button>
        </form>
      </div>
      <ul>
        {movies.map(({ title, id, poster_path }) => {
          return (
            <li key={id}>
              <NavLink to={`${id}`} state={{ from: `/movies?${searchParams}` }}>
                <img
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w300${poster_path} `
                      : `https://static.thenounproject.com/png/1642843-200.png`
                  }
                  alt={title}
                />
                <p> {title} </p>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
