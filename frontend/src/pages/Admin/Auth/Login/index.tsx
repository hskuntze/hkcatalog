import { Link } from 'react-router-dom';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';

import './styles.css';
import { requestBackendLogin } from 'util/requests';

type FormData = {
  username: string;
  password: string;
}

const Login = () => {

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (formData : FormData) => {
    requestBackendLogin(formData)
    .then((response) => {
      console.log('success!', response);
    })
    .catch((err) => {
      console.log('error', err);
    })
  };

  return (
    <div className='login-container'>
      <div className="base-card login-card">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              type="text"
              className="form-control base-input"
              placeholder="Email"
              {...register("username")}
            />
          </div>
          <div className="mb-2">
            <input
              {...register("password")}
              type="password"
              className="form-control base-input"
              placeholder="Password"
            />
          </div>
          <Link to="/admin/auth/recover" className="login-link-recover">
            Esqueci a senha
          </Link>
          <div className="login-submit">
            <ButtonIcon text="Fazer login" />
          </div>
          <div className="signup-container">
            <span className="not-registered">Não tem Cadastro?</span>
            <Link to="/admin/auth/register" className="login-link-register">
              CADASTRAR
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
