import React from 'react'

export default function EventsUploadForm() {
  return (
    <>
      <div className='flex justify-center items-center p-30'>
        <form
          action="/events"
          method="post"
          encType="multipart/form-data"
          className="flex flex-col gap-10 w-full p-30 border-2"
        >
          <input
            type='text'
            name="show_name"
            placeholder='Show Name :'
            className='input input-secondary w-full'
          />
          <input
            type='text'
            name="place"
            placeholder='Place :'
            className='input input-secondary w-full'
          />
          <input
            type='number'
            name="ticket_price"
            placeholder='Ticket Price :'
            className='input input-secondary w-full'
          />
          <input
            type='text'
            name="genre"
            placeholder='Genre :'
            className='input input-secondary w-full'
          />
          <input
            type='text'
            name="category"
            placeholder='Category :'
            className='input input-secondary w-full'
          />
          <textarea
            name="discription"
            placeholder='Description :'
            className='textarea textarea-secondary w-full'
          />
          <input
            type='file'
            name="show_image"
            className='file-input file-input-secondary w-full'
          />
          <button
            type='submit'
            className='btn btn-secondary w-full'
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}