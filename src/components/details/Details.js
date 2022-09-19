import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import { Field, Form } from 'react-final-form';
import { setProductValues } from '../../redux/actions';

const Details = () => {
  const store = useSelector((store) => {
    return store.store;
  });
  const dispatch = useDispatch();
  const onSubmit = () => (console.log("submit"));
  return(
    <Grid container flexDirection={'column'}>
      <Typography variant='h5'>Product Details</Typography>
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
              <Button disabled={invalid} variant='contained' onClick={() => dispatch(setProductValues(values))}>
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
`

Details.propTypes = {};

Details.defaultProps = {};

export default Details;
