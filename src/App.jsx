
import Header from './Components/Header';
import './App.css';

function App() {
  return (
    <>
      <Header />

      <main>
        <section id="inicio" className="hero">
          <p>OLÁ, MEU NOME É LUCIANO</p>

          <h1>
            Desenvolvedor <span>Front-end</span>
            em formação.
          </h1>

          <p>
            Estou aprendendo a desenvolver aplicações web
            utilizando React e tecnologias modernas.
          </p>
        </section>

        <section id="sobre">
          <h2>Sobre mim</h2>
        </section>

        <section id="habilidades">
          <h2>Habilidades</h2>
        </section>

        <section id="projetos">
          <h2>Projetos</h2>
        </section>

        <section id="contato">
          <h2>Contato</h2>
        </section>
      </main>
    </>
  );
}

export default App;
