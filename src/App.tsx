import { useState } from "react";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime?: number;
  imdbRating?: number;
  userRating?: number;
}
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr: number[]) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  return (
    <>
      <NavBar>
        <Results movies={movies} />
      </NavBar>
      <Main>
        <ListBox>
          <MoviesList movies={movies} />
        </ListBox>
        <ListBox>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </ListBox>
      </Main>
    </>
  );
}
interface NavBarProps {
  children: React.ReactNode;
}

export const NavBar: React.FC<NavBarProps> = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      {children}
      <p>Welcome to the Abyssal Pain</p>
    </nav>
  );
};

interface ResultsProps {
  movies: Movie[];
}

export const Results: React.FC<ResultsProps> = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

interface SearchProps {}

export const Search: React.FC<SearchProps> = ({}) => {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

interface LogoProps {}

export const Logo: React.FC<LogoProps> = ({}) => {
  return (
    <div className="logo">
      <span>🔱</span>
      <h1>useRate</h1>
    </div>
  );
};

interface MainProps {
  children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => {
  return <main className="main">{children}</main>;
};

interface ListBoxProps {
  children: React.ReactNode;
}

export const ListBox: React.FC<ListBoxProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
};
// interface WatchedListBoxProps {}

// export const WatchedListBox: React.FC<WatchedListBoxProps> = ({}) => {
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>

//         </>
//       )}
//     </div>
//   );
// };
interface MoviesListProps {
  movies: Movie[];
}

export const MoviesList: React.FC<MoviesListProps> = ({ movies }) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
};

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

interface WatchedSummaryProps {
  watched: Array<Movie>;
}

export const WatchedSummary: React.FC<WatchedSummaryProps> = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating!));
  const avgUserRating = average(watched.map((movie) => movie.userRating!));
  const avgRuntime = average(watched.map((movie) => movie.runtime!));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

interface WatchedMovieListProps {
  watched: Array<Movie>;
}

export const WatchedMovieList: React.FC<WatchedMovieListProps> = ({
  watched,
}) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
};

interface WatchedMovieProps {
  movie: Movie;
}

export const WatchedMovie: React.FC<WatchedMovieProps> = ({ movie }) => {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
};
