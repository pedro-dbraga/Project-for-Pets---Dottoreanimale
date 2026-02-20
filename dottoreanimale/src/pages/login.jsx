import Header from "../layouts/header";
import LoginCard from "../components/cardlogin";
import '../styles/login.css';

export default function Login() {
  return (
    <div>
      <Header />
      <div className="loginpage">
        <p>Life gets busy. it’s hard to remember every little detail. Let Dottore Animale take care of it for you.</p>
        <LoginCard/>
      </div>
    </div>
  );
}