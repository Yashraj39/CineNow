import React, { useEffect, useState } from "react";
import Navbar from "./Components/shared/Navbar";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState(null); // user/admin
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    fetch("/api/checkAuth", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setAuth(data.loggedIn);
        setRole(data.role || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar role={role} setAuth={setAuth} setRole={setRole}/>}
      <div className={!hideNavbar ? "pt-16" : ""}></div>
      <Outlet context={{ auth, setAuth, role, setRole }} />
    </>
  );
}

export default App;
