import { useState } from "react";
import Header from "../layouts/header";
import "../styles/pets.css"
import MenuConta from "../components/menuconta";
import PerfilPet from "../components/menupet";

export default function User() {

    const [activeMenu, setActiveMenu] = useState('pets');
    const menu = () =>{
        switch(activeMenu){
            case 'conta':
                return <MenuConta/>;
            case 'pets':
                return <PerfilPet/>;
            default:
                return <PerfilPet/>;
        }
    }

  return (
    <div>
        <Header />
        <nav className="navegation">
            <a onClick={() => setActiveMenu("conta")}>Conta</a>
            <a onClick={() => setActiveMenu("pets")}>Pets</a>
        </nav>
        <section>
            {menu()}
        </section>
    </div>
  );
}