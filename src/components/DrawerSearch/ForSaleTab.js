import React from 'react'
import PropertyTypesControl from './PropertyTypesControl'
import PriceSliderControl from './PriceSliderControl'
import BedroomSliderControl from './BedroomSliderControl'
import BathroomSliderControl from './BathroomSliderControl'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {updateSnackbarData, showMenu, showDrawer, setFilteredProperties} from '../../store/actions';
import { useDispatch, useSelector } from "react-redux";

function ForSaleTab(){

    const forSaleFormData = useSelector(state => state.forSaleFormData);
    const properties = useSelector(state => state.properties);
    const dispatch = useDispatch();


    const submitForm = ()=>{

        // check form validation
        let isFormValid = true;
        for(let fieldName in forSaleFormData){
            const fieldValue = forSaleFormData[fieldName]
            if(fieldValue.validationStatus === true){
                isFormValid = false
            }
        }

        // proceed if form is valid
        if(isFormValid){
            // dispatch(updateSnackbarData({message:'Search Form is ready for submission', openStatus:true}));
            const {selectedBathroomRange,selectedBedroomRange,selectedPriceRange,selectedPropertyTypes} = forSaleFormData;

            const filteredProperties = properties.filter(p => 
            {
                // check if property type was selected                
                if(selectedPropertyTypes.value.includes(p.properties.property_type) ){
                    
                    
                    // price condition applies to all
                    const condition1 = parseFloat(p.properties.price) >= parseFloat(selectedPriceRange.value[0]) && parseFloat(p.properties.price) <= parseFloat(selectedPriceRange.value[1]);

                    // condition for Apartment or House
                    if(p.properties.property_type == "Apartment" || p.properties.property_type == "House"){

                        const condition2 = parseInt(p.properties.num_bedrooms) >= selectedBedroomRange.value[0] && parseInt(p.properties.num_bedrooms) <= selectedBedroomRange.value[1];
                        const condition3 = parseInt(p.properties.num_bathrooms) >= selectedBathroomRange.value[0] && parseInt(p.properties.num_bathrooms) <= selectedBathroomRange.value[1];

                        return condition1 && condition2 && condition3;
                    }

                    //condition for land
                    return condition1;
                }


                return false;                
            });

            dispatch(setFilteredProperties(filteredProperties));
            dispatch(showMenu("search_results"));
            dispatch(showDrawer());

        }else{
            dispatch(updateSnackbarData({message:'Search Form is not complete', openStatus:true}));
        }
    }





    return (

        <>
        <div className="drawer-search-container">

            <section>                    
                <div>
                    <h4 className="title1">LOCATION &amp; ESTATE DETAIL</h4>
                    
                    <div style={{paddingTop: "15px"}}>
                        <label>Province: </label>
                    </div>
                    <div style={{paddingTop: "15px"}}>
                        <label>Estate: Where Courts</label>
                    </div>

                </div>
            </section>

            <br/>
            <hr style={{background:"#ccc", borderBottom: "1px solid white"}}/> 
            <br/>

            <section>
                <h4 className="title1">PROPERTY DETAIL</h4>

                <br/>
                <PropertyTypesControl/>

                <br/><br/><br/>
                <PriceSliderControl />

                <br/><br/><br/>
                <BedroomSliderControl />

                <br/><br/><br/>
                <BathroomSliderControl />
            </section>


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


export default ForSaleTab