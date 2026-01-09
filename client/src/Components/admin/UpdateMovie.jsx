import React, { useState, useEffect } from "react";

export default function UpdateMovie() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [formData, setFormData] = useState({
    movieName: "",
    duration: "",
    genre: "",
    category: "",
    rated: "",
    releaseDate: "",
    cast: "",
    trailerLink: "",
    description: "",
    poster: null,
  });

  // Fetch all movies for dropdown
  useEffect(() => {
    fetch("/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  // Prefill form when movie selected
  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedMovieId(id);

    if (id) {
      const movie = movies.find((m) => m._id === id);
      if (movie) {
        setFormData({
          movieName: movie.movieName,
          duration: movie.duration,
          genre: movie.genre,
          category: movie.category,
          rated: movie.rated,
          releaseDate: movie.releaseDate,
          cast: movie.cast,
          trailerLink: movie.trailerLink,
          description: movie.description,
          poster: null,
        });
      }
    } else {
      setFormData({
        movieName: "",
        duration: "",
        genre: "",
        category: "",
        rated: "",
        releaseDate: "",
        cast: "",
        trailerLink: "",
        description: "",
        poster: null,
      });
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "poster") {
      setFormData({ ...formData, poster: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Update movie
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMovieId) {
      alert("Please select a movie first!");
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    const res = await fetch(`/movies/${selectedMovieId}`, {
      method: "PUT",
      body: form,
    });

    if (res.ok) {
      alert("✅ Movie updated!");
    } else {
      alert("❌ Update failed");
    }
  };

  // Delete movie
  const handleDelete = async () => {
    if (!selectedMovieId) {
      alert("Please select a movie first!");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    const res = await fetch(`/movies/${selectedMovieId}`, { method: "DELETE" });
    if (res.ok) {
      alert("🗑️ Movie deleted!");
      setMovies(movies.filter((m) => m._id !== selectedMovieId));
      setSelectedMovieId("");
      setFormData({
        movieName: "",
        duration: "",
        genre: "",
        category: "",
        rated: "",
        releaseDate: "",
        cast: "",
        trailerLink: "",
        description: "",
        poster: null,
      });
    } else {
      alert("❌ Delete failed");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Update or Delete Movie</h2>

      {/* Select Movie */}
      <select
        value={selectedMovieId}
        onChange={handleSelect}
        className="select select-bordered w-full mb-6"
      >
        <option value="">-- Select a Movie --</option>
        {movies.map((m) => (
          <option key={m._id} value={m._id}>
            {m.movieName}
          </option>
        ))}
      </select>

      {selectedMovieId && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-lg border-2 p-6 rounded-lg mx-auto"
        >
          <input
            type="text"
            name="movieName"
            value={formData.movieName}
            onChange={handleChange}
            placeholder="Movie Name"
            className="input input-secondary w-full"
            required
          />

          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration (HH:MM)"
            className="input input-secondary w-full"
            required
          />

          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="select select-secondary w-full"
            required
          >
            <option value="">Select Genre</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Romance">Romance</option>
            <option value="Horror">Horror</option>
            <option value="Fantasy">Fantasy</option>
          </select>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-secondary w-full"
            required
          >
            <option value="">Select Category</option>
            <option value="Bollywood">Bollywood</option>
            <option value="Hollywood">Hollywood</option>
            <option value="Tollywood">Tollywood</option>
            <option value="Independent">Independent</option>
          </select>

          <select
            name="rated"
            value={formData.rated}
            onChange={handleChange}
            className="select select-secondary w-full"
            required
          >
            <option value="">Select Rating</option>
            <option value="U">U</option>
            <option value="UA">UA</option>
            <option value="A">A</option>
            <option value="S">S</option>
          </select>

          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="input input-secondary w-full"
            required
          />

          <input
            type="text"
            name="cast"
            value={formData.cast}
            onChange={handleChange}
            placeholder="Cast (comma separated)"
            className="input input-secondary w-full"
            required
          />

          <input
            type="text"
            name="trailerLink"
            value={formData.trailerLink}
            onChange={handleChange}
            placeholder="Trailer Link"
            className="input input-secondary w-full"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="textarea textarea-secondary w-full"
          />

          <input
            type="file"
            name="poster"
            onChange={handleChange}
            className="file-input file-input-secondary w-full"
          />

          <button type="submit" className="btn btn-secondary w-full">
            Update Movie
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-error w-full"
          >
            Delete Movie
          </button>
        </form>

      )}
    </div>
  );
}
