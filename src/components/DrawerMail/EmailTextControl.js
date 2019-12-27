import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RaisedFormControl from '../RaisedFormControl';

import {updateDrawerMailFormData} from '../../store/actions'
import { useDispatch } from 'react-redux'

export let resetEmail = null;

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
  const [email, setEmail] = React.useState('');

  const handleChange = event => {
    setEmail(event.target.value);
  };

  // expose the local state to the central store
  const updateStore = (validationStatus) =>{
    const payload = {fieldName:'email', fieldValue:{value: email,validationStatus: validationStatus}}  
    dispatch(updateDrawerMailFormData(payload))
  }

  const validateEmail = email => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleValidate = event => {

    if (event.target.value === ""){
      setValidation({status:true, msg:'Email is required'});
      updateStore(true)
    }else if(validateEmail(event.target.value) === false){
      setValidation({status:true, msg:'Email is not valid'});
      updateStore(true)
    }else{
      setValidation({status:false, msg:''});
      updateStore(false)
    }
  }


  resetEmail = ()=> {
    setEmail("");
    const payload = {fieldName:'email', fieldValue:{value: "",validationStatus: true}}  
    dispatch(updateDrawerMailFormData(payload))
  }

  return (
    <>
      <RaisedFormControl justify='center' alignItems="center">
        <TextField className={classes.textField} label="Email" onChange={handleChange} onBlur={handleValidate} value={email}/>
      </RaisedFormControl>
      { validation.status && <span className={classes.validation}>{validation.msg}</span>}
    </>
  );    
}