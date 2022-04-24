import './styles.css';
import { ReactComponent as ArrowIcon } from 'assets/images/Seta.svg';

function ButtonIcon() {
  return (
    <>
      <div className="btn-container">
        <button className="btn btn-primary">
          <h6 className="text-uppercase">Inicie agora a sua busca</h6>
        </button>
        <div className="btn-icon">
          <ArrowIcon />
        </div>
      </div>
    </>
  );
}

export default ButtonIcon;
