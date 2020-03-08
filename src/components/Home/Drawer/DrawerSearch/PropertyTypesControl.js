import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import RaisedFormControl from '../../../RaisedFormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';


import { useSelector,useDispatch } from "react-redux";
import {updateForSaleFormData} from '../../../../store/actions'



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
    width:'90%'
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


function MultipleSelectControl() {
    
  const dispatch = useDispatch();
  const classes = useStyles();
  const [validation, setValidation] = React.useState({status:true, msg:''});
  const [propertyType, setPropertyType] = React.useState([]);
  const propertyTypes = useSelector(state => state.propertyTypes);

  const handleChange = event => {
    setPropertyType(event.target.value);
  };

  // expose the local state to the central store
  const updateStore = (validationStatus) =>{
    const payload = {fieldName:'selectedPropertyTypes', fieldValue:{value: propertyType,validationStatus: validationStatus}}  
    dispatch(updateForSaleFormData(payload))
  }

  const handleValidate = event => {
    
    if(event.target.value.length === 0){
      setValidation({status:true, msg:'This field is required'});
      updateStore(true)
    }else{
      setValidation({status:false, msg:''});
      updateStore(false)
    }
  }


  return (
    <>

          <label>Property Types: </label>

            <RaisedFormControl justify="center" alignItems="center">
              <InputLabel className={classes.inputLabel} id="demo-mutiple-checkbox-label">Choose</InputLabel>
              <Select
                labelid="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                className={classes.select}
                multiple
                value={propertyType}
                onChange={handleChange}
                onBlur = {handleValidate}
                input={<Input />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {propertyTypes.map(name => (
                  <MenuItem key={name} value={name}>
                      <Checkbox color="primary" checked={propertyType.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </RaisedFormControl>
            { validation.status && <span className={classes.validation}>{validation.msg}</span>}

    </>
  );
}


export default MultipleSelectControl