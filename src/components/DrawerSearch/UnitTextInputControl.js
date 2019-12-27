import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RaisedFormControl from '../RaisedFormControl';

import {updateUnitSearchFormData} from '../../store/actions'
import { useDispatch } from 'react-redux'


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
  const [unit, setUnit] = React.useState('');

  const handleChange = event => {
    setUnit(event.target.value);
  };


  // expose the local state to the central store
  const updateStore = (validationStatus) =>{
    const payload = {fieldName:'unit', fieldValue:{value: unit,validationStatus: validationStatus}}  
    dispatch(updateUnitSearchFormData(payload))
  }


  const handleValidate = event => {
    if(event.target.value === ""){
      setValidation({status:true, msg:'Unit is required'});
      updateStore(true)
    }else{
      setValidation({status:false, msg:''});
      updateStore(false)
    }
  }

  return (
    <>
      <RaisedFormControl justify='center' alignItems="center">
        <TextField className={classes.textField} id="standard-basic" label="Enter the unit number" onChange={handleChange} onBlur={handleValidate} />
      </RaisedFormControl>
      { validation.status && <span className={classes.validation}>{validation.msg}</span>}
    </>
  );    
}


export default TextFieldControl