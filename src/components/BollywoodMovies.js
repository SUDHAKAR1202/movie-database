import React, { useState } from "react";
import "./BollywoodMovies.css";

const bollywoodMovies = [
  {
    id: 1,
    title: "3 Idiots",
    rating: 8.9,
    genre: "Comedy, Drama",
    year: 2009,
    director: "Rajkumar Hirani",
    image:
      "https://www.ultraindia.com/wp-content/uploads/2009/10/3-idiots-2009.jpg",
    cast: ["Aamir Khan", "R. Madhavan", "Sharman Joshi"],
  },
  {
    id: 2,
    title: "Dangal",
    rating: 8.4,
    genre: "Biography, Drama, Sport",
    year: 2016,
    director: "Nitesh Tiwari",
    image: "https://data1.ibtimes.co.in/photo/en/full/53821/dangal-produced-by-aamir-khan-kiran-rao-siddharth-roy-kapur-under-disney-aamir-khan.jpg?w=764",
    cast: ["Aamir Khan", "Sakshi Tanwar", "Fatima Sana Shaikh"],
  },
  {
    id: 3,
    title: "Bajrangi Bhaijaan",
    rating: 8.0,
    genre: "Adventure, Comedy, Drama",
    year: 2015,
    director: "Karan Johar",
    image: "https://images.ottplay.com/images/bajrangi-bhaijaan-763.jpg",
    cast: ["Harsha Chaudhary", "Sara Khan", "Arjun Kapoor"],
  },
  {
    id: 4,
    title: "Kabir Singh",
    rating: 7.1,
    genre: "Action, Drama, Romance",
    year: 2019,
    director: "Sandeep Reddy Vanga",
    image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT502zSdZof-k2TBh1Ly0O4ScTjsZj6vKwxTA1_rtDyUrhtZy_D",
    cast: ["Shahid Kapoor", "Kiara Advani", "Soham Majumdar"],
  },
  {
    id: 5,
    title: "Gully Boy",
    rating: 8.2,
    genre: "Biography, Drama, Music",
    year: 2019,
    director: "Zoya Akhtar",
    image: "https://tanqeed.com/wp-content/uploads/2019/01/GullyBoy.jpg",
    cast: ["Ranveer Singh", "Neha Dhupia", "Tanay Chheda"],
  },
  {
    id: 6,
    title: "Andhadhun",
    rating: 8.3,
    genre: "Crime, Thriller",
    year: 2018,
    director: "Sriram Raghavan",
    image:
      "https://akm-img-a-in.tosshub.com/indiatoday/images/photo_gallery/202409/andhadhun_imdb.jpg",
    cast: ["Ayushmann Khurrana", "Tabu", "Radhika Apte"],
  },
];

function BollywoodMovies() {
  const [loading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [movies] = useState(bollywoodMovies);
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [sortBy, setSortBy] = useState("title");

  const getRatingCategory = (rating) => {
    if (rating >= 9.0) return "blockbuster";
    if (rating >= 8.5) return "superhit";
    if (rating >= 7.5) return "hit";
    return "average";
  };

  const genres = [
    "All",
    ...new Set(
      movies.flatMap((movie) => movie.genre.split(",").map((g) => g.trim())),
    ),
  ];

  const filteredMovies = movies
    .filter((movie) => {
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch =
        movie.title.toLowerCase().includes(searchLower) ||
        movie.genre.toLowerCase().includes(searchLower) ||
        movie.director.toLowerCase().includes(searchLower) ||
        movie.cast.some((actor) => actor.toLowerCase().includes(searchLower)) ||
        movie.year.toString().includes(searchLower);

      const matchesGenre =
        selectedGenre === "All" || movie.genre.includes(selectedGenre);

      return matchesSearch && matchesGenre;
    })
    .filter((movie) => !favourites.some((fav) => fav.id === movie.id));

  const sortedAndFilteredMovies = filteredMovies.sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "year":
        return b.year - a.year;
      case "genre":
        return a.genre.localeCompare(b.genre);
      case "title":
      default:
        return a.title.localeCompare(b.title);
    }
  });

  const toggleFavourite = (movie) => {
    const isFav = favourites.find((fav) => fav.id === movie.id);

    if (isFav) {
      setFavourites(favourites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavourites([...favourites, movie]);
    }
  };

  const groupedFavourites = favourites.reduce((acc, movie) => {
    const genre = movie.genre.split(",")[0].trim();

    if (!acc[genre]) {
      acc[genre] = [];
    }

    acc[genre].push(movie);
    return acc;
  }, {});

  return (
    <div className="bollywood-movies">
      <h1>Bollywood Hits</h1>

      {loading ? (
        <div className="loading-spinner">
          <p>Loading Bollywood Movies...</p>
        </div>
      ) : (
        <div className="main-content">
          {/* 🔍 Search */}
          <div className="search-section">
            <input
              type="text"
              placeholder="Search by title, director, or cast"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />

            {searchTerm && (
              <p className="search-results">
                Found {filteredMovies.length} movie
                {filteredMovies.length !== 1 ? "s" : ""} for "{searchTerm}"
              </p>
            )}
          </div>

          <div className="filter-section">
            <h4>Filter by Genre:</h4>
            <div className="genre-buttons">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={`genre-button ${
                    selectedGenre === genre ? "active" : ""
                  }`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="sort-section">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="title">Title (A-Z)</option>
              <option value="year">Year (Newest)</option>
              <option value="rating">Rating (Highest)</option>
              <option value="genre">Genre (A-Z)</option>
            </select>
          </div>

          {favourites.length > 0 && (
            <div className="favourites-section">
              <h2>Favourite Movies ({favourites.length})</h2>

              {Object.keys(groupedFavourites).map((genre) => (
                <div key={genre}>
                  <h2>{genre}</h2>

                  <div className="movies-grid">
                    {groupedFavourites[genre].map((movie) => (
                      <div className="movie-card" key={movie.id}>
                        <img src={movie.image} alt={movie.title} />
                        <h4>{movie.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="movies-grid">
            {sortedAndFilteredMovies.length > 0 ? (
              sortedAndFilteredMovies.map((movie) => (
                <div
                  className={`movie-card ${getRatingCategory(movie.rating)}`}
                  key={movie.id}
                >
                  <img
                    src={movie.image}
                    alt={`${movie.title} poster`}
                    className="movie-image"
                  />
                  <h2 className="movie-title">{movie.title}</h2>
                  <p className="movie-year">{movie.year}</p>
                  <p className="movie-genre">{movie.genre}</p>
                  <p className="movie-director">Director: {movie.director}</p>
                  <p className="movie-cast">Cast: {movie.cast.join(", ")}</p>

                  <div
                    className={`movie-rating rating-${getRatingCategory(
                      movie.rating,
                    )}`}
                  >
                    <p>Rating: {movie.rating}/10</p>
                  </div>
                  <button onClick={() => toggleFavourite(movie)}>
                    {favourites.some((fav) => fav.id === movie.id)
                      ? "❤️ Unfavourite"
                      : "🤍 Favourite"}
                  </button>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No movies found!</p>
                <p>
                  {searchTerm || selectedGenre !== "All"
                    ? "Try adjusting your search or filter criteria."
                    : "No movies available. Please check back later."}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BollywoodMovies;
