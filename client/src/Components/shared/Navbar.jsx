import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({ role, setAuth, setRole }) {
  const [showMenu, setMenu] = useState(false);
  const navigate = useNavigate();

  if (!role) return null;

  const isAdmin = role?.toLowerCase() === "admin";

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setAuth(false);
    setRole(null);
    navigate("/login");
  };

  return (
    <nav
      className="text-white w-full px-6 py-3 flex flex-col md:flex-row md:justify-between items-start md:items-center fixed top-0 z-10"
      style={{ backgroundColor: "#f03053" }}
    >
      <div className="flex justify-between w-full md:w-auto items-center">
        <img
          className="h-7 mt-1.5 md:h-9 md:ml-10 md:mt-0"
          src="/images/logo.png"
          alt="Logo"
        />
        <button
          className="md:hidden flex justify-center items-center text-2xl"
          onClick={() => setMenu(!showMenu)}
        >
          ☰
        </button>
      </div>

      <div
        className={`${
          showMenu ? "flex" : "hidden"
        } md:flex flex-wrap md:flex-nowrap gap-4 md:gap-10 items-center w-full md:w-auto mt-2 md:mt-0 h-10`}
      >
        <Link to="/home">Movies</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact-us">Contact Us</Link>

        {!isAdmin && <Link to="/my-booking">My Bookings</Link>}

        {isAdmin && (
          <>
            <Link to="/admin/addmovie">Add Movies</Link>
            <Link to="/update-movie">Update Movies</Link>
          </>
        )}

        <button
          onClick={handleLogout}
          className="btn btn-sm btn-warning flex-shrink-0"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
