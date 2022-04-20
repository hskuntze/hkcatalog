import { ReactComponent as MainImage } from 'assets/images/main-image.svg';
import './styles.css';
import Navbar from 'components/Navbar';
import ButtonIcon from 'components/ButtonIcon';

function Home() {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="home-card">
          <div className="home-content">
            <div>
              <h3>O melhor catálogo de produtos para a sua empresa</h3>
              <p>
                Ajudaremos você a definir o melhor estilo de catálogos para a
                sua empresa. Do seu jeitinho!
              </p>
            </div>
            <ButtonIcon />
          </div>
          <div className="home-image">
            <MainImage />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
