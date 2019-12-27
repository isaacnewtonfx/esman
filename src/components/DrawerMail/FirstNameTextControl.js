import React from 'react';
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RaisedFormControl from '../RaisedFormControl';

import {updateDrawerMailFormData} from '../../store/actions'

export let resetFirstName = null;


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
  const classes = useStyles()
  const [validation, setValidation] = React.useState({status:true, msg:''})
  const [firstname, setFirstname] = React.useState('')

  const handleChange = event => {
    setFirstname(event.target.value);
  };

  // expose the local state to the central store
  const updateStore = (validationStatus) =>{
     const payload = {fieldName:'firstName', fieldValue:{value: firstname,validationStatus: validationStatus}}  
     dispatch(updateDrawerMailFormData(payload))
  }

  const handleValidate = event => {

        // validate and update store
        if(event.target.value === ""){
          setValidation({status:true, msg:'First Name is required'});

          updateStore(true)

        }else{
          setValidation({status:false, msg:''});

          updateStore(false)

        }
  }


  resetFirstName = ()=> {
    setFirstname("");
    const payload = {fieldName:'firstName', fieldValue:{value: "",validationStatus: true}}  
    dispatch(updateDrawerMailFormData(payload))
  }


  return (
    <>
      <RaisedFormControl justify='center' alignItems="center">
        <TextField className={classes.textField}  label="First Name" onChange={handleChange} onBlur={handleValidate} value={firstname}/>
      </RaisedFormControl>
      { validation.status && <span className={classes.validation}>{validation.msg}</span>}
    </>
  );    
}