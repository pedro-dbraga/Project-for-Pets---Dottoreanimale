import "../styles/cardlogin.css"
import { useState, useContext } from "react";

import { AuthContext } from "../contexto/AuthContext";

export default function LoginCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const { handleLogin } = useContext(AuthContext);

  async function LoginSubmit(e) {
    e.preventDefault();
    setErro("");
    
    try {
      await handleLogin(email, password);
    } catch (err) {
      setErro(err.message);
    }
    
  }
  async function handleRegister(e) {
    e.preventDefault();
    setErro("");

    try {
      const response = await fetch("http://localhost:3001/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }) 
   });
   await response.json();
   window.location.href = "/login";
}catch (err) {
      setErro(err.message);
    }}
  return (
    <div class="wrapper">
        <div class="card-switch">
            <label class="switch">
               <input type="checkbox" class="toggle"/>
               <span class="slider"></span>
               <span class="card-side"></span>
               <div class="flip-card__inner">
                  <div class="flip-card__front">
                     <div class="title">Sign IN</div>
                     <form onSubmit={LoginSubmit} class="flip-card__form" action="/post">
                        <input class="flip-card__input" name="email" placeholder="Email" type="email"value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input class="flip-card__input" name="password" placeholder="Password" type="password" value={password} onChange={(e) => setSenha(e.target.value)}/>
                        {/* <div>
                           <input type="checkbox" value="Tutor"/> <span>Tutor</span>
                           <input type="checkbox" value="Veterinario"/> <span>Veterinario</span>
                        </div> */}
                        <button class="flip-card__btn" type="submit">Submit</button>
                        {erro && <p style={{ color: "red" }}>{erro}</p>}
                     </form>
                  </div>
                  <div class="flip-card__back">
                     <div class="title">Sign Up</div>
                     <form class="flip-card__form" action="/post" onSubmit={handleRegister}>
                        <input class="flip-card__input" placeholder="Name" type="name" value={name} onChange={(e) => setName(e.target.value)}/>
                        <input class="flip-card__input" name="email" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input class="flip-card__input" name="password" placeholder="Password" type="password" value={password} onChange={(e) => setSenha(e.target.value)}/>
                        {/*<div>
                           <input type="checkbox" value="Tutor"/> <span>Tutor</span>
                           <input type="checkbox" value="Veterinario"/> <span>Veterinario</span>
                        </div>*/}
                        <button class="flip-card__btn">Submit</button>
                     </form>
                  </div>
               </div>
            </label>
        </div>   
   </div>
)
}