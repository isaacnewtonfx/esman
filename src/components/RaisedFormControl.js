import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  formControl: {
    backgroundColor:'white',
    width:'100%',
    margin:'0px',
    borderRadius:4,
    boxShadow: '0 7px 5px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)',
    paddingBottom:10,
    paddingTop:5

  }
}));

export default function RaisedFormControl(props) {   
  const classes = useStyles();

  return (
    <>
      <FormControl className={classes.formControl} >
          <Grid
              container
              justify={props.justify}
              alignItems={props.alignItems}
          >

          {props.children}

          </Grid>
      </FormControl>
    </>
  );    
}