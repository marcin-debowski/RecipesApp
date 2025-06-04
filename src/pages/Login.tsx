import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    alert(`Logged in as: ${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-amber-700">
          Log In
        </h2>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
          <input
            type="email"
            className="mt-1 block w-full border border-amber-300 rounded-md p-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4 text-sm font-medium text-gray-700">
          Password
          <input
            type="password"
            className="mt-1 block w-full border border-amber-300 rounded-md p-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition"
        >
          Log In
        </button>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-amber-600 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;