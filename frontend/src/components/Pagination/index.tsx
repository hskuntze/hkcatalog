import { ReactComponent as ArrowIcon } from 'assets/images/Seta.svg';
import './styles.css';

const Pagination = () => {
    return (
        <div className='pagination-container'>
            <ArrowIcon className="arrow-inactive" />
            <div className="pagination-item active">1</div>
            <div className="pagination-item">2</div>
            <div className="pagination-item">3</div>
            <div className="pagination-item">4</div>
            <div className="pagination-item">5</div>
            <div className="pagination-item">6</div>
            <div className="pagination-item">7</div>
            <div className="pagination-item">8</div>
            <ArrowIcon className="arrow-active"  />
        </div>
    );
}

export default Pagination;