import logo from '../assets/logo.svg';
import '../styles/header.css';

import { useContext } from 'react';
import { AuthContext } from "../contexto/AuthContext";
import { Link } from 'react-router-dom';

export default function Header() {
  const { authenticated, user, handleLogout } = useContext(AuthContext);
  
  return (
    <header className="header">
      <div className="header-left">
        <a href="/" target="_self">
        <img src={logo} className="logo" alt="Dottore logo" />
      </a>
      <a href="/" target="_self">
        <p>Dottore Animale</p>
      </a>
      </div>
      {/*<div className="header-middle">
        <a href="/jornal"><p>Jornal</p></a>
      </div>*/}
      <div>
        {authenticated && user ? (
          <div className="header-right">
            <Link to={`/user/${user.id}`}><p>Hello, {user.name}</p></Link>
            <Link  to="/login" onClick={handleLogout}><p>Logout</p></Link>
          </div>
          
        ) : (
          <Link to="/login"><p>Sign in</p></Link>
        )}
          
      </div>
    </header>
  )
}

