import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import HotelIcon from '@material-ui/icons/Hotel';
import BathtubIcon from '@material-ui/icons/Bathtub';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TitleSelectControl from './TitleSelectControl'
import FristNameTextControl from './FirstNameTextControl'
import LastNameTextControl from './LastNameTextControl'
import EmailTextControl from './EmailTextControl'
import MobilePhoneTextControl from './MobilePhoneTextControl'
import CountrySelectControl from './CountrySelectControl'
import PublicitySelectControl from './PublicitySelectControl'
import ClientMessageTextControl from './ClientMessageTextControl'

import {resetTitle} from './TitleSelectControl';
import {resetFirstName} from './FirstNameTextControl';
import {resetLastName} from './LastNameTextControl';
import {resetEmail} from './EmailTextControl';
import {resetMobilePhone} from './MobilePhoneTextControl';
import {resetCountry} from './CountrySelectControl';
import {resetPublicity} from './PublicitySelectControl';
import {resetClientMessage} from './ClientMessageTextControl';

import { updateSnackbarData,setSelectedPropertyVisibility } from '../../../../store/actions'


const axios = require('axios').default;

const useStyles = makeStyles(theme => ({
    noSpaces: {
        padding: 0,
        margin: 0
    },
    title: {
        fontWeight: 'bolder',
        margin: '0px 0px 5px 0px'
    },
    value: {
        fontWeight: 'bolder',
        margin: '0px 0px 5px 0px',
        textAlign:'right'
    },

}));

const numberWithCommas = (x) =>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export default function DrawerMail() {
    const urls = useSelector(state => state.urls);
    const classes = useStyles();
    const drawerMailFormData = useSelector(state => state.drawerMailFormData);
    const selectedProperty = useSelector(state => state.selectedProperty);
    const showSelectedProperty = useSelector(state => state.showSelectedProperty);
    const dispatch = useDispatch();
    let [isFormSubmitting, setIsFormSubmitting] = useState(false);

    const submitForm = () => {

        setIsFormSubmitting(true);

        // check form validation
        let isFormValid = true
        for (let fieldName in drawerMailFormData) {

            const fieldValue = drawerMailFormData[fieldName]
            if (fieldValue.validationStatus === true) {
                isFormValid = false
            }
        }

        // proceed if form is valid
        if (isFormValid) {

            // Prepare Post Data
            let formData = new FormData();

            formData.append('title', drawerMailFormData.title.value);
            formData.append('firstName', drawerMailFormData.firstName.value);
            formData.append('lastName', drawerMailFormData.lastName.value);
            formData.append('email', drawerMailFormData.email.value);
            formData.append('phone', drawerMailFormData.mobilePhone.value);
            formData.append('country', drawerMailFormData.country.value);
            formData.append('howYouHeardAboutUs', drawerMailFormData.publicity.value);
            formData.append('message', drawerMailFormData.clientMessage.value);

            // Check if there is a selected property and append the details
            if(showSelectedProperty){

                let prop = selectedProperty.properties;

                formData.append('isPropertySelected', true);
                formData.append('areaSqm', prop.area_sqm);
                formData.append('numBathrooms', prop.num_bathrooms);
                formData.append('numBedrooms', prop.num_bedrooms);
                formData.append('propPk', prop.pk);
                formData.append('price', prop.price);
                formData.append('propertyType', prop.property_type);
                formData.append('unit', prop.unit);
                formData.append('status', prop.status);
            }

            axios.post(urls.enquiryURL, formData)
              .then(function (response) {
                
                if(response.data.status === "success"){
                    dispatch(updateSnackbarData({ message: 'Enquiry sent', openStatus: true }));

                    // reset form entries
                    resetTitle();
                    resetFirstName();
                    resetLastName();
                    resetEmail();
                    resetMobilePhone();
                    resetCountry();
                    resetPublicity();
                    resetClientMessage();


                }else{
                    dispatch(updateSnackbarData({ message: 'There was a problem. Please try again', openStatus: true }));
                }

              })
              .catch(function (error) {
                console.log(error);
              })
              .finally(function () {
                // always executed
                setIsFormSubmitting(false)
              }); 

        } else {
            setIsFormSubmitting(false);
            dispatch(updateSnackbarData({ message: 'Mail Form is not complete', openStatus: true }));
        }
    }


    const statusTextColor = ()=>{

        if (selectedProperty.properties.status.toLowerCase() == "sold"){
            return "red"
        }else if(selectedProperty.properties.status.toLowerCase() == "available"){
            return "green"
        }else{
            return "black"
        }
    }


    const handleCloseDetails = ()=>{
        dispatch(setSelectedPropertyVisibility(false))
    }


    //show room details if the property is a House or Apartment
    let roomDetailsContent = null;
    if( showSelectedProperty && ["Apartment", "House"].includes(selectedProperty.properties.property_type)){
        roomDetailsContent = (<>
                                <Grid item xs={12}>
                                    <Grid container justify="center">
                                        <Badge title="Bedrooms" badgeContent={selectedProperty.properties.num_bedrooms} color="primary">
                                            <HotelIcon />
                                        </Badge>

                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                        <Badge title="Bathrooms" badgeContent={selectedProperty.properties.num_bathrooms} color="primary">
                                            <BathtubIcon />
                                        </Badge>
                                    </Grid>
                                </Grid>
                                <br/><br/>
                            </>
                            );
    }



    return (

        <>
            <div className="drawer-email-container">



            { showSelectedProperty &&

                <div id="property-details-div">

                    <Card raised={true}>
                        <CardContent className={classes.cardContent}>
                            <Grid container>


                                {roomDetailsContent}


                                <Grid item xs={6}>
                                    <p className={classes.title}>Unit</p>
                                    <p className={classes.title}>Unit Type</p>
                                    <p className={classes.title}>Price</p>
                                    <p style={{marginBottom:0, marginTop:20,fontWeight:'bolder', color:statusTextColor()}}>{selectedProperty.properties.status}</p>
                                </Grid>


                                <Grid item xs={6}>
                                            <p className={classes.value}>{selectedProperty.properties.unit}</p>
                                            <p className={classes.value}>{selectedProperty.properties.property_type}</p>
                                            <p className={classes.value}>${numberWithCommas(selectedProperty.properties.price)}</p>
                                            <p className={classes.value} style={{textAlign:'right', marginTop:10}} >
                                                <Button onClick={handleCloseDetails} size="small" variant="contained" color="primary">
                                                    CLOSE DETAILS
                                                </Button>
                                            </p>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <br/><br/>
                </div>      
            }

                <h2 className={classes.noSpaces}>SEND ENQUIRY</h2>

                <br/>

                <form>

                    <TitleSelectControl />

                    <br /><br /><br />

                    <FristNameTextControl />

                    <br /><br /><br />

                    <LastNameTextControl />

                    <br /><br /><br />

                    <EmailTextControl />

                    <br /><br /><br />

                    <MobilePhoneTextControl />

                    <br /><br /><br />

                    <CountrySelectControl />

                    <br /><br /><br />

                    <PublicitySelectControl />

                    <br /><br /><br />

                    <ClientMessageTextControl />

                </form>
            </div>


            <br />
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item >
                    <Button style={{ width: '300px' }} variant="contained" color="primary" onClick={submitForm}>
                        <FontAwesomeIcon icon="envelope" /> 
                            &nbsp; SEND &nbsp;

                        {isFormSubmitting &&
                            <FontAwesomeIcon className="fa-spin" icon="spinner" />
                        }
                        
                    </Button>
                </Grid>
            </Grid>

            <br /><br />
        </>
    );

}