import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemText, Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Select, MenuItem, InputLabel, FormControl, TablePagination } from '@mui/material';
import { removeProduct, selectProduct, sortProducts } from '../../redux/actions';
import styled from 'styled-components';

const ProductsList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const dispatch = useDispatch();
  const store = useSelector((store) => {
    return store.store;
  })
  const [sortBy, setSortBy] = React.useState('');
  const handleSortSelection = (event) => {
    setSortBy(event.target.value);
    dispatch(sortProducts(event.target.value));
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  return(
    <>
      <FormControl sx={{width: "20vw"}} size="small">
        <InputLabel id="sort-by-label">Sort by</InputLabel>
        <Select labelId="sort-by-label" id="sort-by" label="Sort by" value={sortBy} onChange={handleSortSelection}>
          <MenuItem value={'name'}>Name</MenuItem>
          <MenuItem value={'recently_added'}>Recently Added</MenuItem>
        </Select>
      </FormControl>
      <TableContainer>
        <Table size="small">
          <TableBody>
            {
              store.loadedProducts && store.loadedProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((p) => (
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
      {store.loadedProducts && <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={store.loadedProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />}
    </>
  )
};

ProductsList.propTypes = {};

ProductsList.defaultProps = {};

export default ProductsList;
