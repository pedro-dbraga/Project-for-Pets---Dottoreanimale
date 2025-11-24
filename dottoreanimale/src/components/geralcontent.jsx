import "../styles/pets.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import editimg from "../assets/edit_square.svg";
import deleteimg from "../assets/delete.svg"
export default function Geral(){
             
    const { userid } = useParams();
    const { petid } = useParams();
    const [pet, setPet] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        async function fetchPet() {
            try {
                const response = await fetch(`http://localhost:3001/users/${userid}/pets/${petid}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                 })
                 if (response.status === 401) {
                    throw new Error("Não autorizado — faça login novamente.");
                }

                if (!response.ok) {
                    throw new Error("Erro ao buscar pets");
                }

                const data = await response.json();
                setPet(data);
            } catch (err) {
                console.error("Erro ao buscar informações:", err);
                setError(err.message);
            } finally {
            setLoading(false);
             }
        }
        fetchPet();}, [userid, petid]);
    if (!pet) return <p>Informações não encontradas</p>;
    if (loading) return <p>Carregando pets...</p>;
    if (error) return <p>{error}</p>;
    async function handleDelete() {
        const confirmar = window.confirm("Tem certez que deseja excluir este pet?");
        if (!confirmar) return;

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:3001/users/${userid}/pets/${petid}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

      if (response.status === 401) {
        throw new Error("Não autorizado — faça login novamente.");
      }

      if (!response.ok) {
        throw new Error("Erro ao excluir pet");
      }

      
      alert("Pet excluído com sucesso!");
      navigate(`/user/${userid}`);
    } catch (err) {
      console.error("Erro ao excluir pet:", err);
      setError(err.message);
    }
  }
     
    return(
        <div className="wb-geral">
            <div className="wb-c">
                <div className="wb-e">
                <div className="wb-g-e">
                    <span>Age:</span>
                    <span>Weight:</span>
                    <span>Breed:</span>
                </div>
                <div className="wb-g-d">
                    <span>{pet.age}</span>
                    <span>{pet.weight}</span>
                    <span>{pet.breed}</span>
                </div>
            </div>
            <div className="wb-d">
                <div className="wb-g-e">
                    <span>Sex:</span>
                    <span>Specie:</span>
                    <span>Sterelized:</span>
                </div>
                <div className="wb-g-d">
                    <span>{pet.sex}</span>
                    <span>{pet.species}</span>
                    <span>{pet.sterelized}</span>
                </div>
            </div>
            </div>
            <div>
                <a href={`/user/${userid}/pets/${petid}/update`}><img src={editimg} alt="edit"/></a>
                <a onClick={handleDelete}><img src={deleteimg} alt="delete"/></a>
            </div>
            
        </div>
    );
}