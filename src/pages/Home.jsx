import React, { useRef } from 'react';
import { useEffect } from 'react';
import Skeleton from './../components/PizzaBlock/Skeleton';
import qs from 'qs'

import Categories from './../components/Categories';
import PizzaBlock from './../components/PizzaBlock/index';
import Sort, { sortArr } from './../components/Sort';
import Pagination from '../Pagination';

import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { changeIndex, onChangePage, setFilters, onChangeSort, selectFilter } from '../redux/slices/filterSlice';
import {fetchPizzas} from '../redux/slices/pizzasSlice'






const Home = () => {
  const {value, currentPage} = useSelector(selectFilter)
  const { items, status } = useSelector(state => state.pizzas)
  const sortType = useSelector((state) => state.filter.sort)
  const {searchValue} = useSelector(state => state.filter)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isSearch = useRef(false)
  const isMounted = useRef(false)

  async function fetchFunc() {
        const category = value > 0 ? `category=${value}` : ''
        const sortBy = `${sortType.sortProperty}`
        const search = searchValue ? `&title=*${searchValue}`: ''
      dispatch(fetchPizzas({
        category,
        sortBy,
        search,
        currentPage
      }))
    }
    useEffect(() => {
      if(isMounted.current) {
        const queryString = qs.stringify({
          sortType: sortType,
          value, 
          currentPage
        })
        navigate(`?${queryString}`)
      }
      isMounted.current = true
    }, [value, sortType, searchValue, currentPage])

    useEffect(() => {
      if(window.location.search) {
        const params = qs.parse(window.location.search.substring(1))
        const sort = sortArr.find(obj => obj.sortProperty === params.sortProperty)
        dispatch(setFilters({
          ...params,
          sort,
        }))
        isSearch.current = true
      }
    }, [])

    useEffect(()=> {
       window.scrollTo(0, 0)
        fetchFunc()
       isSearch.current = false
    }, [value, sortType, searchValue, currentPage])

    const onCategoryClick = (id) => {
      console.log(id)
      dispatch(changeIndex(id))
    }

   const onSortClick = (obj) => {
      console.log(obj)
      dispatch(onChangeSort(obj))
    }
  
    

    return (
        <>
        <div className="container">
        <div className="content__top">
            <Categories categoryId={value} onCategoryClick={onCategoryClick}/>
            <Sort sortType={sortType} setSortType={onSortClick}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
              <div className='content__error-info'>
                <h2>Произошла ошибка 😕</h2>
                <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
              </div>
            ) : (
              <div className="content__items">  
              {
                status === 'loading'
                ? [...new Array(6)].map((_, i) => <Skeleton key={i}/> ) 
                : items.items
                .map((el, i) => (
                <PizzaBlock  key={el.id}  image={el.imageUrl} {...el}/>
                ))
              }
            </div>
            )
          }
          <Pagination currentPage={currentPage} onChangePage={(number) => dispatch(onChangePage(number))}/>
          </div>
        </>
    );
};

export default Home;