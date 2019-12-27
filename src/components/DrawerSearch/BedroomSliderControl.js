import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import RaisedFormControl from '../RaisedFormControl'

import { useSelector,useDispatch } from "react-redux";
import {updateForSaleFormData} from '../../store/actions';


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
  },
  mark: {
    backgroundColor: '#2f4f4f',
    height: 8,
    width: 1,
    marginTop: -3,
  }

});


const marks = [
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
    {
      value: 5,
    }
  ];

function valuetext(value) {
  return value;
}

export default function RangeSlider() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const bedroomsRange = useSelector(state => state.bedroomsRange);
  const [minmax, setValue] = React.useState([1, 5]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // expose the local state to the central store
  const updateStore = () =>{
    const payload = {fieldName:'selectedBedroomRange', fieldValue:{value: minmax,validationStatus: false}}  
    dispatch(updateForSaleFormData(payload))
  }  




  return (
    <>

      <Typography id="range-slider" gutterBottom>
        Bedrooms [min: {minmax[0]} &nbsp;  max: {minmax[1]}]      
      </Typography>


        <RaisedFormControl justify="center" alignItems="center">

            <Slider
              classes={{root:classes.root, thumb:classes.thumb,mark:classes.mark}}
              marks={marks} 
              min={bedroomsRange[0]}
              max={bedroomsRange[1]}
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