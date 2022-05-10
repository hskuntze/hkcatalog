import { Link } from 'react-router-dom';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';

import './styles.css';
import { requestBackendLogin } from 'util/requests';
import { useState } from 'react';

type FormData = {
  username: string;
  password: string;
}

const Login = () => {

  const [hasError, setHasError] = useState(false);

  const { register, handleSubmit, formState: {errors} } = useForm<FormData>();

  const onSubmit = (formData : FormData) => {
    requestBackendLogin(formData)
    .then((response) => {
      setHasError(false);
      console.log('success!', response);
    })
    .catch((err) => {
      setHasError(true);
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
              {...register("username", {
                required: 'Campo obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido'
                }
              })}
            />
            <div className='invalid-feedback d-block'>{errors.username?.message}</div>
          </div>
          <div className="mb-2">
            <input
              {...register("password", {
                required: 'Campo obrigatório'
              })}
              type="password"
              className="form-control base-input"
              placeholder="Password"
            />
            <div className='invalid-feedback d-block'>{errors.password?.message}</div>
          </div>
          {hasError && (
            <div className="alert alert-danger">Credenciais inválidas</div>
          )}
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
