import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import history from 'util/navigate';
import './styles.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

type UrlParams = {
  productId: string;
};

const Form = () => {
  const { productId } = useParams<UrlParams>();

  const isEditing = productId !== 'create';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/products/${productId}` }).then((response) => {
        const product = response.data as Product;
        setValue('name', product.name);
        setValue('price', product.price);
        setValue('description', product.description);
        setValue('imgUrl', product.imgUrl);
        setValue('categories', product.categories);
      });
    }
  }, [isEditing, setValue, productId]);

  const onSubmit = (product: Product) => {
    const params: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}` : '/products',
      data: {
        ...product,
        categories: isEditing ? product.categories : [{ id: 1, name: '' }],
        imgUrl: isEditing
          ? product.imgUrl
          : 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg',
      },
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        history.replace('/admin/products');
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    history.replace('/admin/products');
  };

  return (
    <div className="product-crud-container">
      <div className="base-card form-crud-card">
        <h1>DADOS DO PRODUTO</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row form-crud-input">
            <div className="col-lg-6 inputs-left-container">
              <div className="margin-bottom-30">
                <input
                  type="text"
                  placeholder="Nome do Produto"
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  type="text"
                  placeholder="Preço"
                  {...register('price', {
                    required: 'Campo obrigatório',
                  })}
                  className={`form-control base-input ${
                    errors.price ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <textarea
                  rows={10}
                  placeholder="Descrição"
                  {...register('description', {
                    required: 'Campo obrigatório',
                  })}
                  className={`form-control base-input h-auto ${
                    errors.description ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback d-block">
                  {errors.description?.message}
                </div>
              </div>
            </div>
          </div>
          <div className="form-crud-button-container">
            <button
              className="btn btn-outline-danger form-crud-button"
              onClick={handleCancel}
            >
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
