import { ReactComponent as SearchIcon } from 'assets/images/Union.svg';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Category } from 'types/category';
import { requestBackend } from 'util/requests';
import Select from 'react-select';
import './styles.css';

export type FilterProduct = {
  name: string;
  category: Category | null;
};

type Props = {
  onSubmitFilter : (data: FilterProduct) => void;
}

const FilterBar = ({onSubmitFilter}: Props) => {
  const { register, handleSubmit, control, setValue, getValues } = useForm<FilterProduct>();

  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const handleClear = () => {
    setValue('name', '');
    setValue('category', null);
  }

  const handleChangeCategory = (value: Category) => {
    setValue('category', value);
    const obj = {
      name: getValues('name'),
      category: getValues('category')
    }
    onSubmitFilter(obj);
  }

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) => {
      setSelectCategories(response.data.content);
    });
  }, []);

  const onSubmit = (filter: FilterProduct) => {
    onSubmitFilter(filter);
  };

  return (
    <div className="base-card search-bar">
      <form onSubmit={handleSubmit(onSubmit)} className="filter-bar-form">
        <div className="filter-input">
          <input
            type="text"
            placeholder="Nome do Produto"
            {...register('name')}
            className="form-control"
          />
          <button className="filter-icon">
            <SearchIcon />
          </button>
        </div>
        <div className="filter-category-and-clear">
          <div className="filter-category">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectCategories}
                  isClearable
                  onChange={(value) => handleChangeCategory(value as Category)}
                  placeholder="Categoria"
                  classNamePrefix="product-filter-select"
                  getOptionLabel={(category: Category) => category.name}
                  getOptionValue={(category: Category) => String(category.id)}
                />
              )}
            />
          </div>
          <button
            onClick={handleClear}
            className="btn btn-outline-secondary clean-button"
          >
            Limpar <span className="span-filtro">Filtro</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterBar;
