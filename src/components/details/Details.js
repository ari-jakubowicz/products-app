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
        validate= {values => {
          const errors = {}
          if (!values.name) {
            errors.name = 'Required'
          }
          if (values.price <= 0) {
            errors.price = 'Price must be higher than 0'
          }
          if (values.description?.length > 200) {
            errors.description = 'Maximum 200 characters'
          }
          return errors
        }}
        initialValues=
          {{ 
            name: store.displayedProduct.name, 
            description: store.displayedProduct.description, 
            price: store.displayedProduct.price,
            id: store.displayedProduct.id
          }}
        render={({ handleSubmit, form, submitting, pristine, values, invalid }) => (
          <form>
            <Grid flexDirection={'column'}>
              <Field name="name">
                {({ input, meta }) => (
                  <Grid display={'flex'} flexDirection={'column'}>
                      <label>Name</label>
                      <CustomInput {...input} type="text" placeholder="Name" />
                      {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                  </Grid>
                )} 
              </Field>
              <Field name="description"> 
                {({ input, meta }) => (
                  <Grid display={'flex'} flexDirection={'column'}>
                      <label>Description</label>
                      <CustomInput {...input} type="text" placeholder="Description" />
                      {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                  </Grid>
                )} 
              </Field>
              <Field name="price">
                {({ input, meta }) => (
                  <Grid display={'flex'} flexDirection={'column'}>
                      <label>Price</label>
                      <CustomInput {...input} type="number" />
                      {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
                  </Grid>
                )} 
              </Field>
              <Button disabled={invalid} onClick={() => dispatch(setProductValues(values))}>
                Save
              </Button>
            </Grid>
          </form> 
        )}
      />
    </Grid>
  )
};

const ErrorMessage = styled.span`
  color: red;
`

const CustomInput = styled.textarea`
  font-family: inherit;
  font-size: inherit;
  height: 15vh;
  resize: none;
  width: 60%;
`

Details.propTypes = {};

Details.defaultProps = {};

export default Details;
