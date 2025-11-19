import Header from "../layouts/header";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function CadastrarVacina(){
    const token = localStorage.getItem("token")
    const {userid} = useParams();
    const { petid } = useParams();

    const [name, setName ] = useState("");
    const [ date, setDate ] = useState("");
    async function CadastraVac(e){
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/users/${userid}/pets/${petid}/vacinas`,{
                method: "POST",
                headers: { "Content-type": "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify({name, date})
            })

            await response.json();

            window.location.href = `/user/${userid}/pets/${petid}`;
        } catch (err){
            console.error(err.message);
        }
    }
    return (
        <div>
            <Header/>
            <div class="boxcadastro">
            <h2 class="title">Cadastrar Vacina</h2>
            <form class="form" method="post" onSubmit={CadastraVac}> 
                <input class="inputbox" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" required /> 
                <input class="inputbox" type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Data" required />
                <button class="btn" type="submit">Cadastrar Vacina</button>
            </form>
        </div>
        </div>
    )
}