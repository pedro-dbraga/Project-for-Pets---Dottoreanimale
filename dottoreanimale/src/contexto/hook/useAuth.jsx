import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(email, password) {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Falha no login");
      }

      const data = await response.json();
      console.log("Resposta do backend:", data);
      const { token, user } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setAuthenticated(true);
      setUser(user);
      console.log(user.id);
      navigate(`/user/${user.id}`);
    } catch (err) {
      console.error("Erro no login:", err);
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return { authenticated, loading, user, handleLogin, handleLogout };
}
