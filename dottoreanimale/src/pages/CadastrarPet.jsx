import Header from "../layouts/header";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/CadastrarPet.css";

export default function CadastroPet() {
    const token = localStorage.getItem("token");
    const { userid } = useParams();
    const [name, setName] = useState("");
    const [img] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [breed, setBreed] = useState("");
    const [spieci, setSpieci] = useState("");
    const [sex, setSex] = useState("");
    const [sterelized, setSterelized] = useState("");

    async function handlePetSignup(e) {
        e.preventDefault(); 
        try {
            const response = await fetch(`http://localhost:3001/users/${userid}/pets`, {
                method: "POST",
                headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                 },
                body: JSON.stringify({ name,img, age, weight, breed, spieci, sex, sterelized })
            });

            const data = await response.json();
            localStorage.setItem("petid", data.id);
            window.location.href = `/user/${userid}/pets/${data.id}`;
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
    <div>
        <Header/>
        <div class="boxcadastro">
            <h2 class="title">Cadastrar Novo Pet</h2>
            <form class="form" method="post" onSubmit={handlePetSignup}> 
                <input class="inputbox" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" required /> 
                <input class="inputbox" type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Idade" required />
                <input class="inputbox" type="text" name="weight" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Peso" />
                <input class="inputbox" type="text" name="breed" value={breed} onChange={(e) => setBreed(e.target.value)} placeholder="Raça" />
                <input class="inputbox" type="text" name="spieci" value={spieci} onChange={(e) => setSpieci(e.target.value)} placeholder="Especie" required />
                <input class="inputbox" type="text" name="sex" value={sex} onChange={(e) => setSex(e.target.value)} placeholder="Genero" required />
                <input class="inputbox" type="text" name="sterelized" value={sterelized} onChange={(e) => setSterelized(e.target.value)} placeholder="Castrado?" required />
                <button class="btn" type="submit">Cadastrar Pet</button>
            </form>
        </div>
    </div>    
        
    );
}