import { useEffect, useState } from 'react';
import {
  useLocation,
  Link,
  useParams,
  Outlet,
  NavLink,
} from 'react-router-dom';
import api from '../../api/moviesApi';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const location = useLocation();
  const goBackBtn = location.state?.from ?? '/';

  useEffect(() => {
    const fetchMovie = async () => {
      const result = await api.getMoviesDetails(movieId);
      setMovie(result.data);
      // console.log(result.data);
    };
    if (movieId) {
      fetchMovie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <button type="button" className="button">
        <Link to={goBackBtn}>Go Back</Link>
      </button>
      <div>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path} `
              : `https://static.thenounproject.com/png/1642843-200.png`
          }
          alt={movie.title}
          width={400}
          height={600}
        />
        <div>
          {' '}
          <h2>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h2>
          <p>User Score: {(movie.vote_average * 10).toFixed(0)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h4>Genres</h4>
          <ul>
            {movie.genres
              ? movie.genres.map(genres => {
                  return (
                    <li key={genres.id}>
                      <p>{genres.name}</p>
                    </li>
                  );
                })
              : ''}
          </ul>
        </div>
      </div>
      <h2>Aditional information</h2>
      <div>
        <NavLink to={`/movies/${movieId}/cast`}>Cast</NavLink>
        <NavLink to={`/movies/${movieId}/reviews`}>Review</NavLink>
      </div>
      <Outlet />
    </div>
  );
}
