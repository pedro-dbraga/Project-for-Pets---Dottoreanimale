import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import petimg from "../assets/petimg.png";

export default function PerfilPet() {
  const { userid } = useParams();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPets() {
      const token = localStorage.getItem("token"); // ✅ recupera token do login

      try {
        const response = await fetch(`http://localhost:3001/users/${userid}/pets`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // ✅ envia token no cabeçalho
          }
        });

        if (response.status === 401) {
          throw new Error("Não autorizado — faça login novamente.");
        }

        if (!response.ok) {
          throw new Error("Erro ao buscar pets");
        }

        const data = await response.json();
        setPets(data);
      } catch (err) {
        console.error("Erro ao buscar pets:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPets();
  }, [userid]);

  if (loading) return <p>Carregando pets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="pets">
      {pets.length > 0 ? (
        pets.map((pet) => (
          <div key={pet.id} className="perfilpet">
            <a href={`${userid}/pets/${pet.id}`}>
              <img src={pet.img || petimg} alt={pet.name} />
            </a>
            <a href={`/pets/${pet.id}`}>
              <p>{pet.name}</p>
            </a>
          </div>
        ))
      ) : (
        <div>
          <p>Ainda não possui Pets Cadastrados</p>
        <a href={`/user/${userid}/cadastrarpet`}><p>Cadastrar Pet +</p></a>
        </div>
      )}
    </div>
  );
}
