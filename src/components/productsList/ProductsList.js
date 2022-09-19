import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemText, Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Select, MenuItem, InputLabel, FormControl, TablePagination, TextField } from '@mui/material';
import { addProduct, removeProduct, selectProduct, sortProducts } from '../../redux/actions';
import styled from 'styled-components';

const ProductsList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [sortBy, setSortBy] = React.useState('');
  const [searched, setSearched] = React.useState('');
  const [shownProducts, setShownProducts] = React.useState([]);

  const dispatch = useDispatch();
  const store = useSelector((store) => {
    return store.store;
  })
  const handleSortSelection = (event) => {
    setSortBy(event.target.value);
    dispatch(sortProducts(event.target.value));
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(()=> {
    setShownProducts([...store.loadedProducts]);
  }, [store.loadedProducts])

  const handleSearchChange = (event) => {
    setSearched([event.target.value]);
    const filteredRows = store.loadedProducts.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setShownProducts([...filteredRows]);
  };

  // const cancelSearch = () => {
  //   setSearched("");
  //   requestSearch(searched);
  // };

  return(
    <>
      <TableNavBar>
        <Button color="success" variant="contained" onClick={() => dispatch(addProduct(store))}> ADD </Button>
        <TextField size="small" placeholder='search products' id="search" value={searched} onChange={handleSearchChange}></TextField>
        <FormControl sx={{width: "20vw"}} size="small">
          <InputLabel id="sort-by-label">Sort by</InputLabel>
          <Select labelId="sort-by-label" id="sort-by" label="Sort by" value={sortBy} onChange={handleSortSelection}>
            <MenuItem value={'none'}>None</MenuItem>
            <MenuItem value={'name'}>Name</MenuItem>
            <MenuItem value={'recently_added'}>Recently Added</MenuItem>
          </Select>
        </FormControl>
      </TableNavBar>
      <TableContainer>
        <Table size="small">
          <TableBody>
            {
              shownProducts && shownProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((p) => (
                  <TableRow sx={{cursor: 'pointer'}} key={p.id} onClick={() => dispatch(selectProduct(p))}>
                    <TableCell>
                      <img style={{height: '40px', width: '50px'}} src='placeholder.png'></img>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 'bold' }}> {p.name} </Typography>
                      <Typography variant='h8'> {p.description} </Typography>
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

const TableNavBar = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
`

export default ProductsList;
