import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexto/auth";

import Home from "../pages/home";
import Jornal from "../pages/jornal";
import Login from "../pages/login";

import ProtectedRoutes from "../routes/protectedroutes";

import AdminPage from "../pages/admin";
import User from "../pages/users";
import PetsGeral from "../pages/petsgeral";

import CadastroPet from "../pages/CadastrarPet";
import UpdatePet from "../pages/UpdatePet";

import CadastrarVacina from "../pages/CadastrarVacina"
export default function AppRoutes() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jornal" element={<Jornal />} />
        
        
        <Route element={<ProtectedRoutes/>}>
            <Route path="/user/:userid" element={<User />} />
            <Route path="/user/:userid/cadastrarpet" element={<CadastroPet />} />
            <Route path="/user/:userid/pets/:petid" element={<PetsGeral />} />
            <Route path="/user/:userid/pets/:petid/update" element={<UpdatePet/>} />
            <Route path="/user/:userid/pets/:petid/vacina" element={<CadastrarVacina/>} />

            <Route path="/admin/:userid" element={<AdminPage/>} />
        </Route>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}
