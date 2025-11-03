import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/pets.css";


export default function Vacinas(){
    const { userid } = useParams();
    const { petid } = useParams();
    const [vacinas, setVacina] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");
        async function fetchVacina() {
            try {
                const response = await fetch(`http://localhost:3001/users/${userid}/pets/${petid}/vacinas`, {
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
                setVacina(data);
            }catch (err) {
                console.error("Erro ao buscar informações:", err);
                setError(err.message);
            } finally {
            setLoading(false);
             }
            }fetchVacina();}, [userid, petid]);
    if (!vacinas) return <p>Informações não encontradas</p>;
    if (loading) return <p>Carregando vacinas...</p>;
    if (error) return <p>{error}</p>;

    function handleUpdate(vacina) {
        console.log("Atualizar vacina:", vacina);
        // aqui você pode abrir um modal, ou trocar estado para editar
    }
    function handleDelete(id) {
        console.log("Deletar vacina com id:", id);
        // aqui você pode filtrar do array ou fazer requisição para backend
    }


    return(
        <div>
            <ul>
                {vacinas.length > 0 ? (
                    vacinas.map((vacina, index) => (
            <li className="vac-ind"key={index}>
                <div className="vacina-info">
                    <span className="vacina-nome" >{vacina.name}</span>
                    <span className="vacina-data">{vacina.date}</span>
                </div>
                <div>
                    <button onClick={() => handleUpdate(vacina)}><img src="" alt="" /></button>
                    <button onClick={() => handleDelete(vacina.id)}><img src="" alt="" /></button>
                </div>
            </li>
          ))
        ) : (
          <li>Nenhuma vacina cadastrada</li>
        )}
            </ul>
        </div>
    );
}