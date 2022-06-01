import { AxiosRequestConfig } from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Category } from 'types/category';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
import history from 'util/navigate';
import './styles.css';

type UrlParams = {
  productId: string;
};

const Form = () => {
  const { productId } = useParams<UrlParams>();

  const isEditing = productId !== 'create';

  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Product>();

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) => {
      setSelectCategories(response.data.content);
    });
  }, []);

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
      data: { ...product, price: String(product.price).replace(',', '.') },
      withCredentials: true,
    };

    requestBackend(params)
      .then(() => {
        toast.info('Sucesso');
        history.replace('/admin/products');
      })
      .catch((err) => {
        toast.error('Erro');
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
        <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
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
                  data-testid="name"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <Controller
                  name="price"
                  rules={{ required: 'Campo obrigatório' }}
                  control={control}
                  render={({ field }) => (
                    <CurrencyInput
                      placeholder="Preço"
                      className={`form-control base-input ${
                        errors.price ? 'is-invalid' : ''
                      }`}
                      disableGroupSeparators={true}
                      value={field.value}
                      onValueChange={field.onChange}
                      data-testid="price"
                    />
                  )}
                />
                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  type="text"
                  placeholder="URL da imagem do produto"
                  {...register('imgUrl', {
                    required: 'Campo obrigatório',
                    // pattern: {
                    //   value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                    //   message: 'Deve ser uma URL válida',
                    // },
                  })}
                  className={`form-control base-input ${
                    errors.imgUrl ? 'is-invalid' : ''
                  }`}
                  data-testid="imgUrl"
                />
                <div className="invalid-feedback d-block">
                  {errors.imgUrl?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <label htmlFor="categories" className="d-none">
                  Categorias
                </label>
                <Controller
                  name="categories"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={selectCategories}
                      classNamePrefix="product-crud-select"
                      isMulti
                      getOptionLabel={(category: Category) => category.name}
                      getOptionValue={(category: Category) =>
                        String(category.id)
                      }
                      inputId="categories"
                    />
                  )}
                />
                {errors.categories && (
                  <div className="invalid-feedback d-block">
                    Campo obrigatório
                  </div>
                )}
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
                  data-testid="description"
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
