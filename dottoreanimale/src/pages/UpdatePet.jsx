import Header from "../layouts/header";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UpdatePet() {
    const token = localStorage.getItem("token");
    const { userid } = useParams();
    const { petid } = useParams();
    
    const [pet, setPet] = useState({
        age: "",
        weight: "",
        breed: "",
        spieci: "",
        sex: "",
        sterelized: "",
    });
    const [error, setError] = useState("");

    useEffect (() => {
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
                setPet({
                    age: data.age || "",
                    weight: data.weight || "",
                    breed: data.breed || "",
                    spieci: data.spieci || "",
                    sex: data.sex || "",
                    sterelized: data.sterelized || "",
                });
            } catch (err) {
                console.error("Erro ao buscar informações:", err);
                setError(err.message);
            } 
        }
        fetchPet();}, [userid, petid, token]);
   function handleChange(e) {
    const { name, value } = e.target;
    setPet((prev) => ({ ...prev, [name]: value }));
  }
    async function handlePetUpdate(e) {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/users/${userid}/pets/${petid}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json",
                    "Authorization": `Baerer ${token}`
                },
                body: JSON.stringify(pet)
            })

            if (!response.ok) throw new Error("Erro ao atualizar pet");
            await response.json();

            window.location.href = `/user/${userid}/pets/${petid}`;
        }catch (err) {
            console.error(err.message);
        }
    }
    if (error) return <p>{error}</p>;
    return (
        <div>
            <Header/>
            <div class="boxcadastro">
            <h2 class="title">Atualizar Pet</h2>
            <form class="form" method="post" onSubmit={handlePetUpdate}> 
                <input class="inputbox" type="number" name="age" value={pet.age} onChange={handleChange} placeholder="Idade" required />
                <input class="inputbox" type="text" name="weight" value={pet.weight} onChange={handleChange} placeholder="Peso" />
                <input class="inputbox" type="text" name="breed" value={pet.breed} onChange={handleChange} placeholder="Raça" />
                <input class="inputbox" type="text" name="spieci" value={pet.spieci} onChange={handleChange} placeholder="Especie" required />
                <input class="inputbox" type="text" name="sex" value={pet.sex} onChange={handleChange} placeholder="Genero" required />
                <input class="inputbox" type="text" name="sterelized" value={pet.sterelized} onChange={handleChange} placeholder="Castrado?" required />
                <button class="btn" type="submit">Atualizar</button>
            </form>
        </div>
        </div>
    );
}