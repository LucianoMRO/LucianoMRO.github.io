import Header from './Components/Header';
import './App.css';
import banner from './assets/banner.png';

function App() {
  return (
    <>
      <Header />

      <main>
        <section className="hero">
          <p>OLÁ, MEU NOME É LUCIANO</p>

          <h1>Desenvolvedor Front-end em formação.</h1>

          <p>
            Estou aprendendo a criar aplicações web com React.
          </p>

          <img src={banner} alt="Ambiente de programação" />
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