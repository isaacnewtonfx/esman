import React from 'react'
import UnitTextInputControl from './UnitTextInputControl'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {updateSnackbarData, setFilteredProperties, showDrawer, showMenu} from '../../../../store/actions';
import { useDispatch, useSelector } from "react-redux";



function UnitSearchTab(){

    const unitSearchFormData = useSelector(state => state.unitSearchFormData);
    const properties = useSelector(state => state.properties);
    const dispatch = useDispatch();

    const [checkedExactMatch, setCheckedExactMatch] = React.useState(true);


    const submitForm = ()=>{

        // check form validation
        let isFormValid = true
        for(let fieldName in unitSearchFormData){

            const fieldValue = unitSearchFormData[fieldName]
            if(fieldValue.validationStatus === true){
                isFormValid = false
            }
        }

        // proceed if form is valid
        if(isFormValid){

            const filteredProperties = properties.filter(p => 
            {
                return (checkedExactMatch) ? p.properties.unit === unitSearchFormData.unit.value : 
                                             p.properties.unit.toLowerCase() === unitSearchFormData.unit.value.toLowerCase();
             
            });

            dispatch(setFilteredProperties(filteredProperties));
            dispatch(showMenu("search_results"));
            dispatch(showDrawer());


        }else{
            dispatch(updateSnackbarData({message:'Unit Search Form is not complete', openStatus:true}));
        }
    }


    const handleChange = event => {
        setCheckedExactMatch(event.target.checked)
    };


    return (
        <>
            <div className="drawer-search-container">
                
                <form>
                    {/* <EstateSelectControl/>
                    <br/><br/><br/> */}
                    <UnitTextInputControl/>
                    <br/><br/>

                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={checkedExactMatch}
                            onChange={handleChange}
                            value="checked"
                            color="primary"
                        />
                        }
                        label="Only return exact matches"
                    />

                </form>
                
            </div>


            <br/>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item >
                    <Button style={{width:'300px'}} variant="contained" color="primary" onClick={submitForm}>
                        <FontAwesomeIcon icon="search" /> &nbsp; SEARCH
                    </Button>
                </Grid>
            </Grid>

            <br/><br/>
        </>
        
    )
}


export default UnitSearchTab