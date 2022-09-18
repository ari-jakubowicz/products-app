import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemText, Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField } from '@mui/material';
import ProductsList from '../productsList/ProductsList';
import Details from '../details/Details';
import { addProduct, searchProducts } from '../../redux/actions';

const Catalogue = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => {
    return store.store;
  })
  const [searchBy, setSearchBy] = React.useState('');
  const handleChange = (event) => {
    setSearchBy(event.target.value);
    dispatch(searchProducts(event.target.value));
  }
  return(
    <Grid container>
      <Grid item xs={5}>
        <Button color="success" variant="contained" onClick={() => dispatch(addProduct(store))}> ADD </Button>
        {/* <TextField id="search" value={searchBy} onChange={handleChange}></TextField> */}
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
