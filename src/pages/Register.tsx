import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Registered as: ${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-amber-700">
          Register
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
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password
          <input
            type="password"
            className="mt-1 block w-full border border-amber-300 rounded-md p-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4 text-sm font-medium text-gray-700">
          Confirm Password
          <input
            type="password"
            className="mt-1 block w-full border border-amber-300 rounded-md p-2"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition"
        >
          Register
        </button>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-600 underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;