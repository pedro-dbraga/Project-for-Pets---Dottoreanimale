import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../layouts/header";

import Geral from "../components/geralcontent";
import Vacinas from "../components/vacinacontent";
import petimg from "../assets/petimg.png"
import editimg from "../assets/edit_square.svg"

import "../styles/pets.css"

export default function PetsGeral(){
    const { userid } = useParams();
    const { petid } = useParams();
    const [pets, setPets] = useState([]);
    const [pet, setPet] = useState({});
    const token = localStorage.getItem("token");


    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(pet.name || "");

    //const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [activetab, setActiveTab] = useState('geral');

    const conteudo = () => {
        switch(activetab){
            case 'geral':
                return <Geral/>;
            case 'vacinas':
                return <Vacinas/>;
            default:
                return <Geral/>;
        }
    }
    function formatShortName(fullName) {
        const parts = fullName.trim().split(/\s+/);
         return parts.length > 1 ? `${parts[0]} ${parts[1][0].toUpperCase()}.` : parts[0];
}
    useEffect(() => {
        const token = localStorage.getItem("token");
        async function fetchPets() {
            try {
                const response = await fetch(`http://localhost:3001/users/${userid}/pets`, {
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
        const formattedPets = data.map(pet => ({
      ...pet,
      shortName: formatShortName(pet.name),
    }));
    setPets(formattedPets);
        } catch (err) {
        console.error("Erro ao buscar pets:", err);
        setError(err.message);
      } finally {
        //setLoading(false);
      }
        }
        async function petinfo() {
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
            console.error("Erro ao buscar pets:", err);
        setError(err.message);
      } finally {
        //setLoading(false);
      }
        }

    fetchPets();
    petinfo();}, [userid, petid]);
        async function handleUpdate() {
            try {
                const response = await fetch(`http://localhost:3001/users/${userid}/pets/${petid}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` },
                    body: JSON.stringify({name})
                });
                 if (!response.ok) throw new Error("Falha ao atualizar o nome do pet");
                 await response.json();

                 setPet((prevPet) => ({ ...prevPet, name }));
                 setPets(prevPets =>prevPets.map(p => p.id === petid ? { ...p, name } : p));
                 setIsEditing(false);
                    } catch (err) {
                console.error("Erro ao atualizar pet:", err);
                setError(err.message);
            }
                    
        }
        function handleKeyDown(e) {
             if (e.key === "Enter") {
            e.preventDefault();
            handleUpdate();
            }
         }
        function handleBlur() {
            handleUpdate();
        }   
  //if (loading) return <p>Carregando pets...</p>;
  if (error) return <p>{error}</p>;
           
    return(
        <div>
            <Header/>
            <section className="box">
                <div className="cabeçalhopet">
                    <div className="cp-g-e">
                        {pets.length > 0 ? ( 
                            pets.map((pet, index) => (
                            <a key={pet.id} href={`${pet.id}`}><p>{index > 0 && " | "}{pet.shortName}</p></a>
                        ))
                    ) : (
                        <p>Nenhum pet encontrado.</p>
                    )}
                    </div>
                    <a href={`/user/${userid}/cadastrarpet`}>+ Adicionar Novo Pet</a>
                </div>
                <div className="quadropet">
                    <div className="cabeçalhopet2">
                        <div className="cp-indv">
                            <img className="imgperfil" src={petimg} alt="petimg" />
                            {isEditing ? (
                                <input className="inputnamepet" type="text" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyDown} onBlur={handleBlur} autoFocus/>
                            ): (
                                <p>{pet.name}</p>
                            )
                            }
                            <img className="iconedit" src={editimg} alt="editar" onClick={() => setIsEditing(true)} />
                        </div>
                        <img src="" alt="lembrete" />
                    </div>
                    <div className="menugeral">
                        <ul>
                            <li className={activetab === "geral" ? "ativo" : ""}><a  onClick={() => setActiveTab("geral")}>Geral</a></li>
                            <li className={activetab === "vacinas" ? "ativo" : ""}><a  onClick={() => setActiveTab("vacinas")}>Vacinas</a></li>
                            <li className={activetab === "exames" ? "ativo" : ""}><a onClick={() => setActiveTab("exames")}>Exames</a></li>
                            <li className={activetab === "observações" ? "ativo" : ""}><a onClick={() => setActiveTab("observações")}>Observações</a></li>
                        </ul>
                        <div className="conteudopet">
                            {conteudo()}
                        </div>
                    </div>
                </div>
            </section>    
        </div>
    )
}