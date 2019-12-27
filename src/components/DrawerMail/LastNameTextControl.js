import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RaisedFormControl from '../RaisedFormControl';

import {updateDrawerMailFormData} from '../../store/actions'
import { useDispatch } from 'react-redux'

export let resetLastName = null;


const useStyles = makeStyles(theme => ({
  textField:{
      width:'90%',
  },
  validation:{
    color:'red',
    display:'inline-block',
    marginTop:3
  }
}));



export default function TextFieldControl() {
    
  const dispatch = useDispatch()
  const classes = useStyles();
  const [validation, setValidation] = React.useState({status:true, msg:''})
  const [lastName, setLastname] = React.useState('');

  const handleChange = event => {
    setLastname(event.target.value);
  };

    // expose the local state to the central store
    const updateStore = (validationStatus) =>{
      const payload = {fieldName:'lastName', fieldValue:{value: lastName,validationStatus: validationStatus}}  
      dispatch(updateDrawerMailFormData(payload))
    }
  

  const handleValidate = event => {
    if(event.target.value === ""){
      setValidation({status:true, msg:'Last Name is required'});
      updateStore(true)
    }else{
      setValidation({status:false, msg:''});
      updateStore(false)
    }
  }

  resetLastName = ()=> {
    setLastname("");
    const payload = {fieldName:'lastName', fieldValue:{value: "",validationStatus: true}}  
    dispatch(updateDrawerMailFormData(payload))
  }


  return (
    <>
      <RaisedFormControl justify='center' alignItems="center">
        <TextField className={classes.textField} label="Last Name" onChange={handleChange} onBlur={handleValidate} value={lastName} />
      </RaisedFormControl>
      { validation.status && <span className={classes.validation}>{validation.msg}</span>}
    </>
  );    
}