import { productActions } from "./product-slice";
import items from '../constants/items.json';
import companies from "../constants/companies.json";

export const fetchProductItems = () => {
    return async (dispatch) => {
      const fetchData = async () => {
        const response = await fetch("http://localhost:3000/items");

        if(!response.ok) {
          return items;
        }

        const data = await response.json();
        return data;
      };

    
     const productItems = await fetchData();
     dispatch(productActions.setAllItems({
         items: productItems || []
     }));
      
    };
}


export const fetchCompanies = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/companies");

      if(!response.ok) {
        return companies;
      }

      const data = await response.json();
      return data;
    };

    const allCompanies = await fetchData();
    dispatch(
      productActions.setAllCompanies({
        companies: allCompanies || [],
      })
    );
  };
};