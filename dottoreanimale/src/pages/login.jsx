import Header from "../layouts/header";
import LoginCard from "../components/cardlogin";
import '../styles/login.css';

export default function Login() {
  return (
    <div>
      <Header />
      <div className="loginpage">
        <p>Na correria do dia a dia não conseguimos lembrar de todos os detalhes. Deixe a  Dottore Animale lembrar para você.</p>
        <LoginCard/>
      </div>
    </div>
  );
}