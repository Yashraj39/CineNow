import React, { useState, useEffect } from 'react';

export default function Slider() {
  const [movies, setMovies] = useState({}); // Store grouped movies directly

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const res = await fetch('http://localhost:5000/movies');
        const data = await res.json();

        const grouped = {};
        data.forEach(movie => {
          const category = movie.category || "Uncategorized";
          if (!grouped[category]) grouped[category] = [];
          grouped[category].push(movie);
        });

        setMovies(grouped);
      } catch (err) {
        console.error("Failed to load movies", err);
      }
    };

    loadMovies();
  }, []);

  return (
    <div className='md:mx-20 sm:mx-15 mx-10 py-6'>
      {Object.entries(movies).map(([category, movieList], idx) => (
        <div key={idx} className='mb-12'>
          <p className='md:text-2xl sm:text-2xl text-lg font-bold text-zinc-700 mb-4'>{category}</p>

          <div className='flex flex-nowrap md:gap-16 gap-7 overflow-x-auto'>
            {movieList.map((movie, index) => (
              <div
                key={index}
                className='md:h-auto md:w-52 sm:w-44 w-32 flex-shrink-0 cursor-pointer'
                onClick={() => {
                  localStorage.setItem("selectedMovie", movie.movieName);
                  window.location.href = "/movie-detail";
                }}
              >
                <img
                  className='rounded-xl md:h-86 md:w-52 sm:h-66 sm:w-44 h-54 w-32 object-cover'
                  src={`/upload/${movie.poster}`}
                  alt={movie.movieName}
                />
                <p className='font-semibold mt-3 md:text-lg'>{movie.movieName}</p>
                <p className='my-2 mb-5 font-semibold md:text-base text-sm text-zinc-500'>{movie.genre}</p>
              </div>
            ))}
          </div>
          <div className='border-b border-neutral-600 w-auto mx-15'></div>
        </div>  
      ))}

    </div>
  );
}
