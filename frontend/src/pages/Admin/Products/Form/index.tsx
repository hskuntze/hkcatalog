import './styles.css';

const Form = () => {
  return (
    <div className="product-crud-container">
      <div className="base-card form-crud-card">
        <h1>DADOS DO PRODUTO</h1>
        <form>
          <div className="row form-crud-input">
            <div className="col-lg-6 inputs-left-container">
              <div className="margin-bottom-30">
                <input type="text" className="form-control base-input" />
              </div>
              <div className="margin-bottom-30">
                <input type="text" className="form-control base-input" />
              </div>
              <div>
                <input type="text" className="form-control base-input" />
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <textarea
                  rows={5}
                  className="form-control base-input h-auto"
                />
              </div>
            </div>
          </div>
          <div className="form-crud-button-container">
            <button className="btn btn-outline-danger form-crud-button">
              CANCELAR
            </button>
            <button className="btn btn-primary form-crud-button text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
