import { createReducer } from "@reduxjs/toolkit";
import moment from "moment/moment";
import { addProduct, removeProduct, searchProducts, selectProduct, setProductValues, sortProducts } from "./actions";

function compareName( a, b ) {
  if ( a.name.toUpperCase() < b.name.toUpperCase() ){ // USING toUppercase() BC STRING COMPARISON IS CASE SENSITIVE
    return -1;
  }
  if ( a.name.toUpperCase() > b.name.toUpperCase() ){
    return 1;
  }
  return 0;
}

function compareDate( a, b ) {
  if (moment(a.creation_date).toDate() > moment(b.creation_date).toDate()){
    return -1;
  }
  if (moment(a.creation_date).toDate() < moment(b.creation_date).toDate()){
    return 1;
  }
  return 0;
}

function compareDefault( a, b ) {
  if ( a.id < b.id ){ 
    return -1;
  }
  if ( a.id > b.id ){
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
    creation_date: moment("01/09/2020", "DD/MM/YYYY")
  },
  loadedProducts: [
    {
      id: 0, 
      name: "Ethics", 
      description: "This is a famous book written by Baruch Spinoza", 
      price: 500, 
      creation_date: moment("05/10/2021", "DD/MM/YYYY")
    },
    {
      id: 1, 
      name: "Sapiens", 
      description: "Sapiens, the book, takes us on a breath-taking ride through our entire human history", 
      price: 500, 
      creation_date: moment("20/7/2020", "DD/MM/YYYY")
    },
    {
      id: 2, 
      name: "Harry Potter and the Chamber of Secrets", 
      description: "Harry Potter and the Chamber of Secrets is a fantasy novel written by British author J. K. Rowling", 
      price: 700, 
      creation_date: moment("01/09/2022", "DD/MM/YYYY")
    },
    {
      id: 3, 
      name: "Messi: The Biography", 
      description: "The story of one of the greatest footballers of all time, Lionel Messi.", 
      price: 1000, 
      creation_date: moment("01/09/1992", "DD/MM/YYYY")
    },
    {
      id: 4, 
      name: "Another Book", 
      description: "Great book called Another Book", 
      price: 1000, 
      creation_date: moment("7/10/2022", "DD/MM/YYYY")
    },
  ],
  shownProducts: []
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
      newLoadedProducts.push({...action.payload, id: newLoadedProducts.length, creation_date: moment()}) 
      return {...state, loadedProducts: newLoadedProducts, displayedProduct: newLoadedProducts[newLoadedProducts.length-1]}
    } else {
      newLoadedProducts[newLoadedProducts.findIndex((p) => p.id === action.payload.id)] = action.payload;
      return {...state, loadedProducts: newLoadedProducts, displayedProduct: newLoadedProducts[state.displayedProduct.id]}
    } 
  },
  [sortProducts]: (state, action) => {
    const newOrderBy = action.payload;
    const newLoadedProducts = [...state.loadedProducts];
    if (newOrderBy === 'name') {
      newLoadedProducts.sort(compareName);
    } else if (newOrderBy === 'recently_added') {
      newLoadedProducts.sort(compareDate);
    } else if (newOrderBy === 'none') {
      newLoadedProducts.sort(compareDefault);
    }
    
    return {orderBy: newOrderBy, ...state, loadedProducts: newLoadedProducts};
  },
  [searchProducts]: (state, action) => {
    let newLoadedProducts = [...state.loadedProducts];
    if (action.payload !== "") {
      newLoadedProducts = newLoadedProducts.filter((p) => p.name.toLowerCase().includes(action.payload));
    } else {
      newLoadedProducts = [...state.loadedProducts];
    }
    return {...state, loadedProducts: newLoadedProducts};
  }
});

export default reducer;
