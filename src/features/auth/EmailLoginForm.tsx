import { useState } from "react";
import Dashboard from "../farmer/Dashboard";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase"; // Make sure you have initialized Supabase

const EmailLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("Login successful:", data);
      navigate("/dashboard"); // Redirect user after login
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-[350px] bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
          <button
            type="submit"
            className={`w-full bg-green-600 text-white py-2 px-4 rounded-md transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default EmailLoginForm;
