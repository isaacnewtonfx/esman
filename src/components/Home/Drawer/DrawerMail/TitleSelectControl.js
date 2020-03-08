import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import RaisedFormControl from '../../../RaisedFormControl'

import {updateDrawerMailFormData} from '../../../../store/actions'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";

export let resetTitle = null;

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


export default  function TitleSelectControl() {
    
  const dispatch = useDispatch()
  const classes = useStyles();
  const [title, setTitle] = React.useState('')
  const [validation, setValidation] = React.useState({status:true, msg:''})
  const titles = useSelector(state => state.titles)

  const handleChange = event => {
    setTitle(event.target.value)
  }

  // expose the local state to the central store
  const updateStore = (validationStatus) =>{
    const payload = {fieldName:'title', fieldValue:{value: title,validationStatus: validationStatus}}  
    dispatch(updateDrawerMailFormData(payload))
  }

  const handleValidate = event => {
    if(event.target.value === ""){
      setValidation({status:true, msg:'Title is required'})
      updateStore(true)
    }else{
      setValidation({status:false, msg:''})
      updateStore(false)
    }
  }

  resetTitle = ()=> {
    setTitle("");
    const payload = {fieldName:'title', fieldValue:{value: "",validationStatus: true}}  
    dispatch(updateDrawerMailFormData(payload))
  }

  return (
    <>
        <RaisedFormControl justify="center" alignItems="center">  
                <InputLabel className={classes.inputLabel}>Your title</InputLabel>
                <Select
                    value={title}
                    onChange={handleChange}
                    onBlur = {handleValidate}
                    input={<Input />}
                    className={classes.select}
                >
                  {titles.map(name => (
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