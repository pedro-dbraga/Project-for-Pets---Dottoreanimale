import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "../styles/pets.css";

import editimg from "../assets/edit_square.svg";
import deleteimg from "../assets/delete.svg";

export default function Vacinas() {
  const { userid, petid } = useParams();
  const [vacinas, setVacinas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingValues, setEditingValues] = useState({ name: "", date: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchVacinas() {
      try {
        const response = await fetch(`http://localhost:3001/users/${userid}/pets/${petid}/vacinas`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.status === 401) throw new Error("Não autorizado — faça login novamente.");
        if (!response.ok) throw new Error("Erro ao buscar vacinas");

        const data = await response.json();
        setVacinas(data);
      } catch (err) {
        console.error("Erro ao buscar vacinas:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVacinas();
  }, [userid, petid, token]);

  async function handleUpdate(vacinaid) {
    try {
      const response = await fetch(`http://localhost:3001/users/${userid}/pets/${petid}/vacinas/${vacinaid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(editingValues),
      });

      if (!response.ok) throw new Error("Falha ao atualizar vacina");

      const updatedVacina = await response.json();

      // Atualiza apenas o item editado na lista, sem reload
      setVacinas((prev) =>
        prev.map((v) => (v.id === vacinaid ? updatedVacina : v))
      );

      setEditingId(null);
      setEditingValues({ name: "", date: "" });
    } catch (err) {
      console.error("Erro ao atualizar vacina:", err);
      setError(err.message);
    }
  }

  async function handleDelete(vacinaid) {
    const confirmar = window.confirm("Tem certeza que deseja excluir esta vacina?");
    if (!confirmar) return;

    try {
      const response = await fetch(
        `http://localhost:3001/users/${userid}/pets/${petid}/vacinas/${vacinaid}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Erro ao excluir vacina");

      // Remove do estado sem precisar recarregar
      setVacinas((prev) => prev.filter((v) => v.id !== vacinaid));
    } catch (err) {
      console.error("Erro ao excluir vacina:", err);
      setError(err.message);
    }
  }

  // 🔹 Eventos de input
  function handleKeyDown(e, vacinaid) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdate(vacinaid);
    }
  }

  function handleBlur(vacinaid) {
    handleUpdate(vacinaid);
  }

  if (loading) return <p>Carregando vacinas...</p>;
  if (error) return <p>{error}</p>;
  if (!vacinas || vacinas.length === 0)
    return (
      <a href={`/user/${userid}/pets/${petid}/vacina`}>
        <p>Cadastrar Vacina</p>
      </a>
    );

  return (
    <div className="vacinas-list">
      <ul>
        {vacinas.map((vacina) => (
          <li className="vac-ind" key={vacina.id}>
            <div className="vacina-info">
              {editingId === vacina.id ? (
                <div>
                  <input className="inputbox"ntype="text" name="name" value={editingValues.name} onChange={(e) => setEditingValues((prev) => ({...prev, name: e.target.value,}))} onKeyDown={(e) => handleKeyDown(e, vacina.id)} onBlur={() => handleBlur(vacina.id)} autoFocus required />
                  <input className="inputbox" type="date" name="date" value={editingValues.date} onChange={(e) => setEditingValues((prev) => ({ ...prev, date: e.target.value })) } onKeyDown={(e) => handleKeyDown(e, vacina.id)} onBlur={() => handleBlur(vacina.id)} required />
                </div>
              ) : (
                <div>
                  <span className="vacina-nome">{vacina.name}</span>
                  <span className="vacina-data">{vacina.date}</span>
                </div>
              )}
            </div>

            <div className="vacina-acoes">
              <a onClick={() => { setEditingId(vacina.id); setEditingValues({ name: vacina.name, date: vacina.date });}}>
                <img src={editimg} alt="edit" />
              </a>
              <a onClick={() => handleDelete(vacina.id)}>
                <img src={deleteimg} alt="delete" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
