import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // if using react-router

export const MovieShows = ({ date }) => {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate(); // react-router hook

  useEffect(() => {
    if (!date) return;

    const dayIndex = (new Date(date).getDate() % 3) + 1;
    fetch(`/shows-${dayIndex}.json`)
      .then(res => res.json())
      .then(data => setShows(data))
      .catch(err => console.log(err));
  }, [date]);

  const handleTimeClick = (showName, time) => {
    // store selected cinema and time
    localStorage.setItem('selectedShow', JSON.stringify({ showName, time, date }));
    navigate('/seats'); // redirect to seats page
  };

  return (
    <div className='flex flex-col gap-6 mt-6 mx-4 md:mx-10'>
      {shows.map(show => (
        <div key={show.id} className='flex flex-col md:flex-row justify-between items-center border-1 p-3 rounded-2xl gap-4 md:gap-0'>
          <div className='flex flex-col md:flex-row items-center gap-4 md:gap-10 w-full md:w-auto'>
            <div className="avatar">
              <div className="w-20 h-20 rounded overflow-hidden">
                <img src={show.image} className='object-cover w-full h-full' />
              </div>
            </div>
            <p className='text-center md:text-left'>{show.name}</p>
            <div className='flex gap-2 md:gap-4'>
              {show.icons.map((icon, i) => (
                <img key={i} className='h-7 w-auto' src={icon} alt="icon" />
              ))}
            </div>
          </div>

          <div className='flex flex-wrap justify-center md:justify-end gap-3 md:gap-6 mt-2 md:mt-0'>
            {show.times.map((time, i) => (
              <button
                key={i}
                className='btn btn-success rounded-2xl'
                onClick={() => handleTimeClick(show.name, time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
