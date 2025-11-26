import Header from "../layouts/header";
import "../styles/home.css";
export default function Home() {
  return (
    <div>
    <Header />

    {/*<section>
      <div>
        <h1>Jornal</h1>
        <h2>Conteudo informaivo daqueles que <span>entendem</span> para aqueles que <span>cuidam.</span></h2>
      </div>
      <div className="cards">
        <div className="cardbox">
          <div className="cabeçalho">
            <div>
              <img src="" alt="fotoperfil" />
              <p></p>
            </div>
            <div>
              <p></p>
              <img src="" alt="likes" />
            </div>
          </div>
          <div className="conteudo">
            <p></p>
            <p></p>
            <button>Ler +</button>
          </div>
        </div>
      </div>
    </section>*/}
    <section className="aboutbox">
      <h1 className="abouttitle">ABOUT US</h1>
      <p className="abouttext"> THIS SCIENTIFIC INITIATION PROJECT FOCUSES ON THE DEVELOPMENT OF AN APPLICATION AIMED AT SUPPORTING PET OWNERS IN THE MANAGEMENT OF THEIR PET'S HEALTH</p>
    </section>
</div> 
  );
}