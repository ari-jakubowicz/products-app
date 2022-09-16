import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemText, Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import { removeProduct, selectProduct } from '../../redux/actions';

const ProductsList = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => {
    return store.store;
  })
  return(
    <List>
      {
        store.loadedProducts && store.loadedProducts.map((p) => (
            <ListItemButton key={p.id} onClick={() => dispatch(selectProduct(p))}>
              <img style={{height: '40px', width: '50px'}} src='placeholder.png'></img>
              <Typography> {p.name} </Typography>
              <Button onClick={(event) => {
                  event.stopPropagation();
                  dispatch(removeProduct(p));
              }} variant="outlined" color="error">
                Delete
              </Button>
            </ListItemButton>
        ))
      }
    </List>
  )
};

ProductsList.propTypes = {};

ProductsList.defaultProps = {};

export default ProductsList;
