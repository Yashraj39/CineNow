import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useOutletContext,
} from "react-router-dom";

import HomePage from "./pages/user/HomePage.jsx";
import AddMovies from "./pages/admin/AddMovies.jsx";
import MovieDetail from "./pages/user/MovieDetail.jsx";
import Mo from "./Mo.jsx";
import { BookMovie } from "./pages/user/BookMovie.jsx";
import { Seats } from "./pages/user/Seats.jsx";
import { MyBooking } from "./pages/user/MyBooking.jsx";
import { Services } from "./pages/user/Services.jsx";
import { ContactUs } from "./pages/user/ContactUs.jsx";
import { UpdateMovies } from "./pages/admin/UpdateMovies.jsx";
import Login from "./pages/user/Login.jsx";
import Register from "./pages/user/Register.jsx";

// Protected Route for logged-in users
function ProtectedRoute({ children }) {
  const { auth } = useOutletContext();
  return auth ? children : <Navigate to="/login" replace />;
}

// Protected Route for admin only
function AdminRoute({ children }) {
  const { role } = useOutletContext();
  return role === "admin" ? children : <Navigate to="/home" replace />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Default "/" redirects to HomePage (protected)
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Admin Routes
      {
        path: "admin/addmovie",
        element: (
          <ProtectedRoute>
            <AdminRoute>
              <AddMovies />
            </AdminRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "update-movie",
        element: (
          <ProtectedRoute>
            <AdminRoute>
              <UpdateMovies />
            </AdminRoute>
          </ProtectedRoute>
        ),
      },

      // User Routes
      { path: "movie-detail", element: <MovieDetail /> },
      { path: "mo", element: <Mo /> },
      { path: "book-movie", element: <BookMovie /> },
      { path: "seats", element: <Seats /> },
      { path: "my-booking", element: <MyBooking /> },
      { path: "services", element: <Services /> },
      { path: "contact-us", element: <ContactUs /> },

      // Catch-all route
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);