import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import RaisedFormControl from '../RaisedFormControl'

import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'

import {updateDrawerMailFormData} from '../../store/actions'

export let resetPublicity = null;

const useStyles = makeStyles(theme => ({
  inputLabel:{
    margin:'0px',
    paddingLeft:13
  },
  select:{
    width:'90%'
  },
  validation:{
    color:'red',
    display:'inline-block',
    marginTop:3
  }
}));


export default function SelectControl() {
    
  const dispatch = useDispatch()
  const classes = useStyles();
  const [validation, setValidation] = React.useState({status:true, msg:''})
  const [publicity, setPublicity] = React.useState('');
  const publicityEntries = useSelector(state => state.publicityEntries);

  const handleChange = event => {
    setPublicity(event.target.value);
  };

  // expose the local state to the central store
  const updateStore = (validationStatus) =>{
    const payload = {fieldName:'publicity', fieldValue:{value: publicity,validationStatus: validationStatus}}  
    dispatch(updateDrawerMailFormData(payload))
  }

  const handleValidate = event => {
    if(event.target.value === ""){
      setValidation({status:true, msg:'This field is required'});
      updateStore(true)
    }else{
      setValidation({status:false, msg:''});
      updateStore(false)
    }
  }

  resetPublicity = ()=> {
    setPublicity("");
    const payload = {fieldName:'publicity', fieldValue:{value: "",validationStatus: true}}  
    dispatch(updateDrawerMailFormData(payload))
  }


  return (
    <>
        <RaisedFormControl justify="center" alignItems="center">  
                <InputLabel className={classes.inputLabel}>How you heard about us</InputLabel>
                <Select
                    value={publicity}
                    onChange={handleChange}
                    onBlur= {handleValidate}
                    input={<Input />}
                    className={classes.select}
                >
                  {publicityEntries.map(name => (
                      <MenuItem key={name} value={name}>
                          <ListItemText primary={name} />
                      </MenuItem>
                  ))}
                </Select>
        </RaisedFormControl>
        { validation.status && <span className={classes.validation}>{validation.msg}</span>}
    </>
  );    
}