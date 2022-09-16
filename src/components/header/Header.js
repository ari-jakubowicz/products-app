import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemText, Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';

const Header = () => {
  const store = useSelector((store) => {
    return store.store;
  })
  return(
    <Grid container style={{height: "80px", backgroundColor: "#F0F0FF"}} alignItems="center">
      <Typography variant="h5"> My Store </Typography>
    </Grid>
  )
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
