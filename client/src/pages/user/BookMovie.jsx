import React, { useState } from 'react'
import { DatePicker } from '../../Components/shared/DatePicker'
import { MovieShows } from '../../Components/shared/MovieShows'

export const BookMovie = () => {
    const [selectedDate, setSelectedDate] = useState(
        new Date(new Date().setDate(new Date().getDate() + 1))
            .toISOString().split("T")[0]
    );

    return(
        <>
            <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
            <MovieShows date={selectedDate} />
        </>
    )
}
