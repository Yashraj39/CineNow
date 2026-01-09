import React, { useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setAuth, setRole } = useOutletContext();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      setAuth(true);
      setRole(data.role);
      navigate("/home");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-5 w-80 transform transition duration-500 hover:scale-105"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button className="btn btn-secondary w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition">
          Login
        </button>
        <p className="text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
