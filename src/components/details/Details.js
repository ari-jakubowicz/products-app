import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemText, Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Input, TextField } from '@mui/material';
import styled from 'styled-components';
import { Field, Form } from 'react-final-form';
import { addProduct, setProductValues } from '../../redux/actions';

const Details = () => {
  const store = useSelector((store) => {
    return store.store;
  });
  const dispatch = useDispatch();
  const onSubmit = () => (console.log("submit"));
  return(
    <Grid container flexDirection={'column'}>
      <h3>Details</h3>
      {/* <TextField required id="name" label="Name" defaultValue={store.displayedProduct.name}>
      </TextField>
      <TextField id="description" label="Description" defaultValue={store.displayedProduct.description}>
      </TextField>
      <TextField required id="price" label="Price" defaultValue={store.displayedProduct.price}>
      </TextField> */}

      <Form
        onSubmit={onSubmit}
        initialValues=
          {{ 
            name: store.displayedProduct.name, 
            description: store.displayedProduct.description, 
            price: store.displayedProduct.price 
          }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form>
            <Grid flexDirection={'column'}>
              <Typography>Name</Typography>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
              />
              <Typography>Description</Typography>
              <Field
                name="description"
                component="input"
                type="text"
                placeholder="Description"
              />
              <Typography>Price</Typography>
              <Field
                name="price"
                component="input"
                type="number"
                placeholder="Price"
              />
              <Button onClick={() => dispatch(setProductValues(values))}>
                Save
              </Button>
            </Grid>
          </form> 
        )}
      />
    </Grid>
  )
};

Details.propTypes = {};

Details.defaultProps = {};

export default Details;
