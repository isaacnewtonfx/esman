import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import RaisedFormControl from '../../../RaisedFormControl';

import { useSelector,useDispatch } from "react-redux";
import {updateForSaleFormData} from '../../../../store/actions'


const useStyles = makeStyles({
  root: {
    width: '90%',
    paddingTop:15
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -9,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  }
});

function valuetext(value) {
   const text = value.toLocaleString("en");
  return `$${text}`;
}

export default function RangeSlider() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const priceRange = useSelector(state => state.priceRange);
  const [minmax, setValue] = React.useState([3000, 15000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // expose the local state to the central store
  const updateStore = () =>{
    const payload = {fieldName:'selectedPriceRange', fieldValue:{value: minmax,validationStatus: false}}  
    dispatch(updateForSaleFormData(payload))
  }

  return (
    <>

      <Typography id="range-slider" gutterBottom>
        Price [min: {valuetext(minmax[0])} &nbsp;  max: {valuetext(minmax[1])}]      
      </Typography>


      <RaisedFormControl justify="center" alignItems="center">

          <Slider
            classes={{root:classes.root, thumb:classes.thumb}}
            min={priceRange[0]}
            max={priceRange[1]}
            value={minmax}
            onChange={handleChange}
            onBlur={updateStore}
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />

        </RaisedFormControl>
    </>
  );
}