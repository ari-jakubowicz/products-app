import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemText, Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ProductsList from '../productsList/ProductsList';
import Details from '../details/Details';
import { addProduct } from '../../redux/actions';

const Catalogue = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => {
    return store.store;
  })
  return(
    <Grid container>
      <Grid item xs={5}>
        <b> Catalogue Component </b>
        <Button onClick={() => dispatch(addProduct(store))}> ADD </Button>
        <ProductsList />
      </Grid>
      <Grid item xs={7}>
        <Details></Details>
      </Grid>
    </Grid>
  )
};

Catalogue.propTypes = {};

Catalogue.defaultProps = {};

export default Catalogue;
