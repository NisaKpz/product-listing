import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './UI/Header/Header';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';

import Filter from './Filter/Filter';
import Colors from './constants/Colors';
import companies from './constants/companies.json';
import Products from './Products/Products';
import { fetchCompanies, fetchProductItems } from './store/product-actions';
import Basket from './Basket/Basket';
import Sort from './Sort/Sort';
import Footer from './UI/Footer/Footer';


const Content = styled.main`
  display: flex;
  justify-content: space-around;
  margin: 6.75rem 6.5rem;

  @media (max-width: 1440px) {
    margin: 6.75rem 4.5rem;
  }
  @media (max-width: 1090px) {
    margin: 6.75rem 3.5rem;
  }
  @media (max-width: 1024px) {
    margin: 6.75rem 2.5rem;
  }

  @media (max-width: 768px) {
    display: block;
    margin: ${(props) => (props.showBasket > 0 ? "18rem" : "6.75rem")} 2rem;
  }

  @media (max-width: 425px) {
    margin: ${(props) => (props.showBasket > 0 ? "18rem" : "6.75rem")} 0rem;
  }
`;

const ProductsContainer = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width:100%
  }
  margin: 0px 1rem;
`;

const SortContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const FilterBar = styled.div`
  border-radius: 8px;
  width: 100%;
  height: 48px;
  padding: 0;
  margin: 0;
  background-color: #f4f4f4;
  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 427px) {
    height: 40px;
    margin-left: 10px;
  }
`;

const FilterBarUl = styled.ul`
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  padding: 0;
  height: 100%;
  margin: 0;
`;

const FilterBarli = styled.li`
  position: relative;
  color: #919191;
  text-align: center;
  list-style: none;
  overflow: hidden;
  width: 50%;
  &:not(:last-child):after {
    content: " ";
    position: absolute;
    border: 1px solid #dddddd;
    height: 100%;
    right: 0px;
  }
  &:hover {
    color: ${Colors.primary};
  }
`;

const BasketContainer = styled.div`
  @media (max-width: 768px) {
    display: inherit;
    top: 90px;
    position: absolute;
    right: 25px;
  }
`;
;
const sortItems = (sortType, items) => {
  const arrayForSort = [...items];

  switch (sortType) {
    case "priceAscending":
      arrayForSort.sort((a, b) => a.price - b.price);

      break;
    case "priceDescending":
      arrayForSort.sort((a, b) => b.price - a.price);
      break;

    case "timeDescending":
      arrayForSort.sort((a, b) => new Date(b.added) - new Date(a.added));
      break;

    case "timeAscending":
      arrayForSort.sort((a, b) => new Date(a.added) - new Date(b.added));
      break;
  } 

  return arrayForSort;
} 

function App() {
  const [allFilters, setFilters] = useState([]);
  const [sortedProductItems, setSortedProductItems] = useState([]);
  const [tags, setTags] = useState([]); 
  const productItems = useSelector((state) =>  state.product.items );
  const basketItems = useSelector((state) => state.basket.items);

  const dispatch = useDispatch();


  const onFilterChange = (userSelectedFilters) => {
    console.log(userSelectedFilters);
    setFilters([...userSelectedFilters]);
  };

  useEffect(() => {
    dispatch(fetchProductItems());
    dispatch(fetchCompanies());
  }, []);

  useEffect(() => {
      const allTags = [];
      productItems.length > 0 && setSortedProductItems(
        sortItems("priceAscending", productItems)
      );
      productItems.forEach((item) => {
        item.tags.forEach((itemTag) => {
          const index = allTags.findIndex((tag) => tag.name === itemTag);
          if (index === -1) {
            allTags.push({ name: itemTag, slug: itemTag });
          }
        });
      });

      setTags([...allTags]);
  }, [productItems])

  const sortChangeHandler = (sortType) => {
    setSortedProductItems(sortItems(sortType, productItems));
  } 


  return (
    <div>
      <Header />
      <Content showBasket={basketItems.length}>
        <FilterBar>
          <FilterBarUl>
            <FilterBarli>
              <span>
                <span class="_1indv hb-button__text">Sırala</span>
              </span>
            </FilterBarli>
            <FilterBarli>
              <span>
                <span class="_1indv hb-button__text">Filtrele</span>
              </span>
            </FilterBarli>
          </FilterBarUl>
        </FilterBar>
        <SortContainer>
          <Sort onSortChange={sortChangeHandler}></Sort>
          <Filter
            label="Brands"
            filters={companies}
            filterChanged={onFilterChange}
          ></Filter>
          <Filter
            label="Tags"
            filters={tags}
            filterChanged={onFilterChange}
          ></Filter>
        </SortContainer>
        <ProductsContainer>
          <Products
            allFilters={allFilters}
            items={sortedProductItems}
          ></Products>
        </ProductsContainer>
        <BasketContainer>
          <Basket></Basket>
        </BasketContainer>
      </Content>
      <Footer />
    </div>
  );
}

export default App;
