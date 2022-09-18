import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemText, Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { removeProduct, selectProduct, sortProducts } from '../../redux/actions';
import styled from 'styled-components';

const ProductsList = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => {
    return store.store;
  })
  const [sortBy, setSortBy] = React.useState('');
  const handleSortSelection = (event) => {
    setSortBy(event.target.value);
    dispatch(sortProducts(event.target.value));
  }

  return(
    <>
      <FormControl sx={{width: "20vw"}} size="small">
        <InputLabel id="sort-by-label">Sort by</InputLabel>
        <Select labelId="sort-by-label" id="sort-by" label="Sort by" value={sortBy} onChange={handleSortSelection}>
          <MenuItem value={'Name DESC'}>Name DESC</MenuItem>
          <MenuItem value={'Name ASC'}>Name ASC</MenuItem>
          <MenuItem value={'Creation Date DESC'}>Creation Date DESC</MenuItem>
          <MenuItem value={'Creation Date ASC'}>Creation Date ASC</MenuItem>
        </Select>
      </FormControl>
      <TableContainer>
        <Table size="small">
          <TableBody>
            {
              store.loadedProducts && store.loadedProducts.map((p) => (
                  <TableRow sx={{cursor: 'pointer'}} key={p.id} onClick={() => dispatch(selectProduct(p))}>
                    <TableCell>
                      <img style={{height: '40px', width: '50px'}} src='placeholder.png'></img>
                    </TableCell>
                    <TableCell>
                      <Typography> {p.name} </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography> {p.creation_date?.toString()} </Typography>
                    </TableCell>
                    <TableCell>
                      <Button onClick={(event) => {
                          event.stopPropagation();
                          dispatch(removeProduct(p));
                      }} variant="outlined" color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
};

ProductsList.propTypes = {};

ProductsList.defaultProps = {};

export default ProductsList;
