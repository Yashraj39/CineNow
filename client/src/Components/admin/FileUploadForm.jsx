import React from 'react';

export default function FileUploadForm() {
  return (
    <div className='flex justify-center items-center p-10 w-full'>
      <form
        action="/movies"
        method="post"
        encType="multipart/form-data"
        className="flex flex-col gap-4 w-full max-w-lg p-6 border-2 rounded-lg"
      >
        <input
          type='text'
          name="movieName"
          placeholder='Movie Name'
          className='input input-secondary w-full'
          required
        />

        <input type='text'
          name="duration"
          placeholder='Duration :'
          className='input input-secondary w-full'
          required
        />

        <select name="genre" className='select select-secondary w-full' required>
          <option value="">Select Genre</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Romance">Romance</option>
          <option value="Horror">Horror</option>
          <option value="Fantasy">Fantasy</option>
        </select>

        <select name="category" className='select select-secondary w-full' required>
          <option value="">Select Category</option>
          <option value="Bollywood">Bollywood</option>
          <option value="Hollywood">Hollywood</option>
          <option value="Tollywood">Tollywood</option>
          <option value="Gujrati">Gujrati</option>
          <option value="Independent">Independent</option>
        </select>

        <select name="rated" className='select select-secondary w-full' required>
          <option value="">Select Rating</option>
          <option value="U">U</option>
          <option value="UA">UA</option>
          <option value="A">A</option>
          <option value="S">S</option>
        </select>

        <input
          type='date'
          name="releaseDate"
          className='input input-secondary w-full'
          required
        />

        <input
          type='text'
          name="cast"
          placeholder='Cast (comma separated)'
          className='input input-secondary w-full'
          required
        />

        <input
          type='text'
          name="trailerLink"
          placeholder='Trailer Link'
          className='input input-secondary w-full'
        />

        <textarea
          name="description"
          placeholder='Description'
          className='textarea textarea-secondary w-full'
        />

        <input
          type='file'
          name="poster"
          className='file-input file-input-secondary w-full'
          required
        />

        <button
          type='submit'
          className='btn btn-secondary w-full'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
