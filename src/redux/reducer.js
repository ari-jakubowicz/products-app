import { createReducer } from "@reduxjs/toolkit";
import moment from "moment/moment";
import { addProduct, removeProduct, selectProduct, setProductValues, sortProducts } from "./actions";

function compareDesc( a, b ) {
  console.log("desc");
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

function compareAsc( a, b ) {
  console.log("asc");
  if ( a.name > b.name ){
    return -1;
  }
  if ( a.name < b.name ){
    return 1;
  }
  return 0;
}

const initialState = {
  orderBy: '',
  displayedProduct: {
    id: 0, 
    name: "Ethics", 
    description: "This is a famous book written by Baruch Spinoza", 
    price: 500, 
    creation_date: moment().format('01/09/2020')
  },
  loadedProducts: [
    {
      id: 0, 
      name: "Ethics", 
      description: "This is a famous book written by Baruch Spinoza", 
      price: 500, 
      creation_date: moment().format('05/10/2021')
    },
    {
      id: 1, 
      name: "Sapiens", 
      description: "Sapiens, the book, takes us on a breath-taking ride through our entire human history", 
      price: 500, 
      creation_date: moment().format('23/7/2020')
    },
    {
      id: 2, 
      name: "Harry Potter and the Chamber of Secrets", 
      description: "Harry Potter and the Chamber of Secrets is a fantasy novel written by British author J. K. Rowling", 
      price: 700, 
      creation_date: moment().format('01/09/2022')
    },
    {
      id: 3, 
      name: "Messi: The Biography", 
      description: "The story of one of the greatest footballers of all time, Lionel Messi.", 
      price: 1000, 
      creation_date: moment().format('01/09/1992')
    },
  ]
}

const reducer = createReducer(initialState, {
  [addProduct]: (state, action) => {
    return {...state, displayedProduct: {name: "", description: "", price: 0}};
  },
  [removeProduct]: (state, action) => {
    const removedProduct = action.payload.id;
    const newLoadedProducts = [...state.loadedProducts].filter((p) => p.id !== removedProduct);
    return {...state, loadedProducts: newLoadedProducts};
  },
  [selectProduct]: (state, action) => {
    const newDisplayedProduct = action.payload;
    return {...state, displayedProduct: newDisplayedProduct}
  },
  [setProductValues]: (state, action) => {
    let newLoadedProducts = [...state.loadedProducts];
    if (typeof state.displayedProduct.id === "undefined") {
      newLoadedProducts.push({id: newLoadedProducts.length, ...action.payload, creation_date: moment().format("DD/MM/YYYY")}) 
      return {...state, loadedProducts: newLoadedProducts, displayedProduct: newLoadedProducts[newLoadedProducts.length-1]}
    } else {
      newLoadedProducts[newLoadedProducts.findIndex((p) => p.id === action.payload.id)] = action.payload;
      return {...state, loadedProducts: newLoadedProducts, displayedProduct: newLoadedProducts[state.displayedProduct.id]}
    } 
  },
  [sortProducts]: (state, action) => {
    let newOrderBy = action.payload;
    let newLoadedProducts = [...state.loadedProducts];
    if (newOrderBy === 'Name DESC') {
      newLoadedProducts.sort(compareDesc);
    } else if (newOrderBy = 'Name ASC') {
      newLoadedProducts.sort(compareAsc);
    }
    return {orderBy: newOrderBy, ...state, loadedProducts: newLoadedProducts};
  }
});

export default reducer;
