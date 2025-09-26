import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const { role } = useOutletContext(); // get role from App context
  const isAdmin = role?.toLowerCase() === "admin";

  useEffect(() => {
    const movieName = localStorage.getItem("selectedMovie");
    fetch(`http://localhost:5000/api/movies?name=${movieName}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, []);

  if (!movie)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );

  const castArray = movie.cast.split(",").map((c) => c.trim());

  return (
    <div className="p-6 md:p-12 flex flex-col font-sans bg-base-100">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        <div className="relative group">
          <img
            className="md:w-80 sm:w-64 w-48 rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-300"
            src={`/upload/${movie.poster}`}
            alt={movie.movieName}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-transparent p-2 rounded-b-3xl text-white text-center opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="font-bold">{movie.movieName}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center md:items-start items-center gap-4 md:gap-6 text-center md:text-left w-full md:w-1/2">
          <p className="text-4xl font-bold text-gray-900">{movie.movieName}</p>
          <p className="font-medium text-gray-600 md:text-lg">
            • {movie.duration} • {movie.genre} • {movie.rated} • {movie.releaseDate}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {castArray.map((actor, idx) => (
              <span key={idx} className="badge badge-outline badge-primary">
                {actor}
              </span>
            ))}
          </div>

          <a
            href={movie.trailerLink}
            target="_blank"
            className="text-primary font-semibold underline hover:text-secondary transition-colors duration-200 mt-2"
          >
            Watch Trailer
          </a>

          {/* Only show Book Now if NOT admin */}
          {!isAdmin && (
            <button
              className="btn btn-primary mt-4"
              onClick={() => {
                localStorage.setItem("bookMovie", movie.movieName);
                window.location.href = "/book-movie";
              }}
            >
              Book Now
            </button>
          )}
        </div>
      </div>

      <div className="mt-12 px-4 md:px-0 max-w-5xl mx-auto text-gray-700 text-base md:text-lg leading-relaxed border-t border-gray-200 pt-6">
        <p>{movie.description}</p>
      </div>
    </div>
  );
}
