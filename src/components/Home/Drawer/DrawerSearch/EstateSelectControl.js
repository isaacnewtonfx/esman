import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import RaisedFormControl from '../../../RaisedFormControl';

import {updateUnitSearchFormData} from '../../../../store/actions';
import { useSelector,useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({

  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
    backgroundColor:"lightgray"
  },
  inputLabel:{
    paddingLeft:10
  },
  select:{
    width:'90%',
  },
  validation:{
    color:'red',
    display:'inline-block',
    marginTop:3
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function SelectControl() {
    
  const dispatch = useDispatch();
  const classes = useStyles();
  const [validation, setValidation] = React.useState({status:true, msg:''});
  const [estate, setEstate] = React.useState('');
  const estates = useSelector(state => state.estates);

  const handleChange = event => {
    setEstate(event.target.value);
  };


  // expose the local state to the central store
  const updateStore = (validationStatus) =>{
    const payload = {fieldName:'selectedEstate', fieldValue:{value: estate,validationStatus: validationStatus}}  
    dispatch(updateUnitSearchFormData(payload))
  }

  const handleValidate = event => {
    if(event.target.value === ""){
      setValidation({status:true, msg:'Estate is required'});
      updateStore(true)
    }else{
      setValidation({status:false, msg:''});
      updateStore(false)
    }
  }




  return (
    <>

        <label>Select Estate to Search: </label>

        <RaisedFormControl justify="center" alignItems="center">
            <InputLabel className={classes.inputLabel} id="demo-mutiple-checkbox-label">Choose</InputLabel>
            <Select
                labelid="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                className={classes.select}
                value={estate}
                onChange={handleChange}
                onBlur = {handleValidate}
                input={<Input />}
                MenuProps={MenuProps}
            >
            {estates.map(name => (
                <MenuItem key={name} value={name}>
                    <Checkbox color="primary" checked={estate.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                </MenuItem>
            ))}
            </Select>
        </RaisedFormControl>
        { validation.status && <span className={classes.validation}>{validation.msg}</span>}

    </>
  );    
}


export default SelectControl