const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

// ---------------- DB Connection ----------------
mongoose.connect("mongodb://127.0.0.1:27017/CineNow");
const db = mongoose.connection;
db.once("open", () => console.log("✅ MongoDB connected successfully!"));

// ---------------- Middleware ----------------
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use("/upload", express.static(path.join(__dirname, "/upload")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "secretKey123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// ---------------- Admin Hardcoded ----------------
const ADMIN = {
  username: "admin",
  email: "admin@cinema.com",
  password: "admin123",
};

// ---------------- Schemas ----------------
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const movieSchema = new mongoose.Schema({
  movieName: String,
  duration: String,
  genre: String,
  category: String,
  rated: String,
  releaseDate: String,
  cast: String,
  trailerLink: String,
  poster: String,
  description: String,
});
const Movie = mongoose.model("MovieData", movieSchema);

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  movieName: String,
  cinemaName: String,
  showTime: String,
  date: String,
  seats: [String],
  totalPrice: Number,
  bookedAt: { type: Date, default: Date.now },
});
const Booking = mongoose.model("BookingData", bookingSchema);

// ---------------- Multer Setup ----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "/upload/");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ---------------- Routes ----------------

// Register
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, email, password: hashed });
    await user.save();
    res.json({ message: "✅ User registered successfully!" });
  } catch (err) {
    res.status(400).json({ message: "❌ Registration failed", error: err });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Admin login
  if (email === ADMIN.email && password === ADMIN.password) {
    req.session.userId = "admin";
    req.session.role = "admin";
    return res.json({ message: "✅ Admin login successful", role: "admin", username: ADMIN.username });
  }

  // User login
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid password" });

  req.session.userId = user._id;
  req.session.role = "user";
  res.json({ message: "✅ Login successful", role: "user", username: user.username });
});

// Check session
app.get("/api/checkAuth", (req, res) => {
  if (req.session.userId) {
    return res.json({ loggedIn: true, role: req.session.role });
  }
  res.json({ loggedIn: false });
});

// Logout
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => res.json({ message: "✅ Logged out" }));
});

// Movies CRUD
app.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.get("/api/movies", async (req, res) => {
  const name = req.query.name;
  const movie = await Movie.findOne({ movieName: name });
  res.json(movie);
});

app.post("/movies", upload.single("poster"), async (req, res) => {
  const data = new Movie({ ...req.body, poster: req.file.filename });
  await data.save();
  res.status(200).send("Movie added successfully");
});

app.put("/movies/:id", upload.single("poster"), async (req, res) => {
  const updateData = { ...req.body };
  if (req.file) updateData.poster = req.file.filename;
  const movie = await Movie.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!movie) return res.status(404).send("Movie not found");
  res.status(200).json({ message: "Movie updated successfully", movie });
});

app.delete("/movies/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).send("Movie not found");
  res.status(200).json({ message: "Movie deleted successfully" });
});

// Bookings
app.post("/bookings", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: "Not logged in" });

  const booking = new Booking({ ...req.body, userId: req.session.userId });
  await booking.save();
  res.status(200).json({ message: "Booking successful", bookingId: booking._id });
});

app.get("/api/bookings", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: "Not logged in" });

  const bookings = await Booking.find({ userId: req.session.userId });
  res.json(bookings);
});

app.get("/bookings/:id", async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  res.json(booking);
});

// React fallback
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../client/dist/index.html")));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));