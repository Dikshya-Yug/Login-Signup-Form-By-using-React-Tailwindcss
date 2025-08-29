import { useState } from "react";
import Dashboard from "./Dashboard";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null); // 👈 track login

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );
      if (foundUser) {
        setLoggedInUser(foundUser); // 👈 redirect to Dashboard
      } else {
        setMessage("❌ Invalid email or password");
      }
    } else {
      const exists = users.some((u) => u.email === email);
      if (exists) {
        setMessage("⚠️ Email already registered!");
      } else {
        const newUser = { email, password };
        setUsers([...users, newUser]);
        setMessage(`✅ Registered successfully: ${email}`);
      }
    }

    setEmail("");
    setPassword("");
  };

  const handleLogout = () => {
    setLoggedInUser(null); // 👈 back to login
    setMessage("");
  };

  // 👉 If logged in, show Dashboard
  if (loggedInUser) {
    return <Dashboard user={loggedInUser} onLogout={handleLogout} />;
  }

  // 👉 Else show Login/Register form
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-700 to-purple-800">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "New user?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
            className="text-purple-700 hover:underline"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>

        {message && (
          <p className="mt-4 text-center font-semibold text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
