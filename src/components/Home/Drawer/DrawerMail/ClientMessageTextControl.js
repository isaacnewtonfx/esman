import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RaisedFormControl from '../../../RaisedFormControl';
import { useDispatch } from 'react-redux'

import {updateDrawerMailFormData} from '../../../../store/actions'

export let resetClientMessage = null;

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

function TextFieldControl() {
    

  const dispatch = useDispatch()
  const classes = useStyles();
  const [validation, setValidation] = React.useState({status:true, msg:''})
  const [clientMessage, setClientMessage] = React.useState('');

  const handleChange = event => {
    setClientMessage(event.target.value);
  };

  // expose the local state to the central store
  const updateStore = (validationStatus) =>{
    const payload = {fieldName:'clientMessage', fieldValue:{value: clientMessage,validationStatus: validationStatus}}  
    dispatch(updateDrawerMailFormData(payload))
  }

  const handleValidate = event => {
    if(event.target.value === ""){
      setValidation({status:true, msg:'Message is required'});
      updateStore(true)
    }else{
      setValidation({status:false, msg:''});
      updateStore(false)
    }
  }

  resetClientMessage = ()=> {
    setClientMessage("");
    const payload = {fieldName:'clientMessage', fieldValue:{value: "",validationStatus: true}}  
    dispatch(updateDrawerMailFormData(payload))
  }

  return (
    <>
      <RaisedFormControl justify='center' alignItems="center">
        <TextField className={classes.textField} 
                    placeholder="Your message" 
                    multiline 
                    rows="3" 
                    rowsMax='10' 
                    onChange={handleChange} 
                    onBlur={handleValidate}
                    value ={clientMessage}/>
      </RaisedFormControl>
      { validation.status && <span className={classes.validation}>{validation.msg}</span>}
    </>
  );    
}


export default TextFieldControl