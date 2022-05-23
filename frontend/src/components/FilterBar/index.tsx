import { ReactComponent as SearchIcon } from 'assets/images/Union.svg';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Category } from 'types/category';
import { requestBackend } from 'util/requests';
import Select from 'react-select';
import './styles.css';

type FilterProduct = {
  name: string;
  category: Category;
};

const FilterBar = () => {
  const {
    register,
    handleSubmit,
    control,
  } = useForm<FilterProduct>();

  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) => {
      setSelectCategories(response.data.content);
    });
  }, []);

  const onSubmit = (filter: FilterProduct) => {
    console.log(filter);
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
            <SearchIcon/>
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
                  placeholder="Categoria"
                  classNamePrefix="product-filter-select"
                  getOptionLabel={(category: Category) => category.name}
                  getOptionValue={(category: Category) => String(category.id)}
                />
              )}
            />
          </div>
          <button className="btn btn-outline-secondary clean-button">Limpar <span className='span-filtro'>Filtro</span></button>
        </div>
      </form>
    </div>
  );
};

export default FilterBar;
