import './styles.css';
import { ReactComponent as ArrowIcon } from 'assets/images/Seta.svg';

type Props = {
  text: string;
}

function ButtonIcon({text} : Props) {
  return (
    <>
      <div className="btn-container">
        <button className="btn btn-primary">
          <h6 className="text-uppercase">{text}</h6>
        </button>
        <div className="btn-icon">
          <ArrowIcon />
        </div>
      </div>
    </>
  );
}

export default ButtonIcon;
