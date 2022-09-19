import { createAction } from "@reduxjs/toolkit";

export const addProduct = createAction("ADD_PRODUCT");
export const setProductValues = createAction("SET_PRODUCT_VALUES");
export const removeProduct = createAction("REMOVE_PRODUCT");
export const selectProduct = createAction("SELECT_PRODUCT");
export const sortProducts = createAction("SORT_PRODUCTS");
export const searchProducts = createAction("SEARCH_PRODUCTS");
