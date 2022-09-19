import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemText, Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField } from '@mui/material';
import ProductsList from '../productsList/ProductsList';
import Details from '../details/Details';

const Catalogue = () => {
  return(
    <Grid container>
      <Grid item xs={7}>
        <ProductsList />
      </Grid>
      <Grid item xs={5}>
        <Details></Details>
      </Grid>
    </Grid>
  )
};

Catalogue.propTypes = {};

Catalogue.defaultProps = {};

export default Catalogue;
