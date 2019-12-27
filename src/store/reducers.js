import { combineReducers } from 'redux'

import {
  TOGGLE_DRAWER,
  SHOW_DRAWER,
  SHOW_MENU,
  REINDEX_CLICKED_IMAGE,
  SET_GALLERY_OPEN_STATUS,
  UPDATE_DRAWER_MAIL_FORM_DATA,
  UPDATE_SNACKBAR_DATA,
  UPDATE_FOR_SALE_FORM_DATA,
  UPDATE_UNIT_SEARCH_FORM_DATA,
  SET_SELECTED_PROPERTY,
  SET_PROPERTIES,
  SET_FILTERED_PROPERTIES,
  SET_SELECTED_PROPERTY_VISIBILITY,
  SET_AUTH_TOKEN,
  AUTH_LOGOUT
} from './actions'



function unitSearchFormData(state = {

  // selectedEstate: {value:'', validationStatus:true},
  unit:           {value:'', validationStatus:false},

}, action){
  switch(action.type){

    case UPDATE_UNIT_SEARCH_FORM_DATA:

      return {...state, [action.payload.fieldName] : action.payload.fieldValue}

    default:
      return state
  }
}


function forSaleFormData(state = {

  selectedPropertyTypes: {value:[], validationStatus:true},
  selectedPriceRange:    {value:[3000, 15000], validationStatus:false},
  selectedBedroomRange:  {value:[1,5], validationStatus:false},
  selectedBathroomRange: {value:[1,5], validationStatus:false},

}, action){
  switch(action.type){

    case UPDATE_FOR_SALE_FORM_DATA:

      return {...state, [action.payload.fieldName] : action.payload.fieldValue}

    default:
      return state
  }
}



function drawerMailFormData(state = {

  title:         {value:'', validationStatus:true},
  firstName:     {value:'', validationStatus:true},
  lastName:      {value:'', validationStatus:true},
  email:         {value:'', validationStatus:true},
  mobilePhone:   {value:'', validationStatus:true},
  country:       {value:'', validationStatus:true},
  publicity:     {value:'', validationStatus:true},
  clientMessage: {value:'', validationStatus:true},

}, action){
  switch(action.type){

    case UPDATE_DRAWER_MAIL_FORM_DATA:

      return {...state, [action.payload.fieldName] : action.payload.fieldValue}

    default:
      return state
  }
}

function snackbarData(state = {

  message:'',
  openStatus:false

}, action){

  switch(action.type){

    case UPDATE_SNACKBAR_DATA:

      return {...state, message : action.payload.message, openStatus:action.payload.openStatus}

    default:
      return state
  }


}


function publicityEntries(state = ['Newspaper Advert','Newsletter','Mail Campaign','Development Explorer','Mortgage Clinic',
'TV','Relatives','Website','Billboard','Pamphlet','Friends','Promotion','Magazine Advert','Radio',
'Exhibition','Referral','Pointer Boards','Pre-Launch Club','Search Engine','Other' ], action){
  switch(action.type){

    default:
      return state
  }
}


function titles(state = [
  "Mr.","Mrs.","Ms","Ing.","Dr.","Prof.","Chief","Rev"
], action){
  switch(action.type){

    default:
      return state
  }
}

function showSelectedProperty(state = false, action){
  switch(action.type){

    case SET_SELECTED_PROPERTY_VISIBILITY:
      return action.payload;

    default:
      return state
  }
}

function selectedProperty(state = {}, action){
  switch(action.type){

    case SET_SELECTED_PROPERTY:
      return action.payload;

    default:
      return state
  }
}

function filteredProperties(state = [], action){
  switch(action.type){

    case SET_FILTERED_PROPERTIES:
      return action.payload;

    default:
      return state
  }
}

function properties(state = [

  // {type:"", geometry:{}, properties:{unit:'P1', type: 'Land', size: 3.7, price: 67}},
  // {type:"", geometry:{}, properties:{unit:'P2', type: 'Land', size: 25.0, price: 51}},
  // {type:"", geometry:{}, properties:{unit:'P3', type: 'Land', size: 16.0, price: 24}},
  // {type:"", geometry:{}, properties:{unit:'P4', type: 'Land', size: 6.0, price: 24}},
  // {type:"", geometry:{}, properties:{unit:'P5', type: 'Land', size: 3.2, price: 87}},
  // {type:"", geometry:{}, properties:{unit:'P7', type: 'Land', size: 9.0, price: 37}},
  // {type:"", geometry:{}, properties:{unit:'P8', type: 'Land', size: 0.0, price:94}},
  // {type:"", geometry:{}, properties:{unit:'P9', type: 'Land', size: 26.0, price: 65}},
  // {type:"", geometry:{}, properties:{unit:'P10', type: 'Land', size: 0.2, price: 98}},
  // {type:"", geometry:{}, properties:{unit:'P11', type: 'Land', size: 0.5, price:81}},
  // {type:"", geometry:{}, properties:{unit:'P12', type: 'Land', size:19.0, price:9}},
  // {type:"", geometry:{}, properties:{unit:'P13', type: 'Land', size: 18.0, price: 63}},

], action){
  switch(action.type){

    case SET_PROPERTIES:
      return action.payload;

    default:
      return state
  }
}


function estates(state = [], action){
  switch(action.type){

    // case SET_ESTATES:
    //   return action.payload;

    default:
      return state
  }
}


function bathroomsRange(state = [1, 5], action){
  switch(action.type){

    default:
      return state
  }
}

function bedroomsRange(state = [1, 5], action){
  switch(action.type){

    default:
      return state
  }
}

function priceRange(state = [0, 20000], action){
  switch(action.type){

    default:
      return state
  }
}

function propertyTypes(state = ['Apartment', 'Land', 'House'], action){
  switch(action.type){

    default:
      return state
  }
}


function isGalleryOpen(state = false, action){
  switch(action.type){

    case SET_GALLERY_OPEN_STATUS:
      return action.status

    default:
      return state
  }
}


function galleryViewerImages(state = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg'], action ){
  switch (action.type){

    case REINDEX_CLICKED_IMAGE:

        const clonedImages = [...state]
        let imageIndexLocal = 0
        const imageNameClicked = action.payload.imgName

        // get corresponding index in galleryViewerImages
        clonedImages.forEach( (imgName, index)=>{
          if (imgName === imageNameClicked){
            imageIndexLocal = index
          }
        })

        clonedImages.splice(0, 0, clonedImages.splice(imageIndexLocal, 1)[0])
        return clonedImages

    default:
      return state
  }
}

function galleryImages(state = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg'], action){
  switch(action.type){

    default:
      return state
  }
}

function currentMenu(state = "home", action){
  switch(action.type){
    
    case SHOW_MENU:
      return action.menu   

    default:
      return state
  }
}


function isDrawerShown(state = true, action){
  switch(action.type){

    case TOGGLE_DRAWER:
      return !state
    case SHOW_DRAWER:
      return true

    default:
      return state
  }
}


function urls(state = {

  propertiesURL : "http://localhost:8000/api/properties/",
  estatesURL : "http://localhost:8000/api/estates/",
  propertyTypesURL : "http://localhost:8000/api/property_types/",
  enquiryURL: "http://localhost:8000/api/enquiry/",
  authURL: "http://localhost:8000/auth-jwt/",
  refreshTokenURL: "http://localhost:8000/api/refreshtoken/"

}, action){
  switch(action.type){

    default:
      return state
  }
}

function authToken(state = "", action){
  switch(action.type){

    case SET_AUTH_TOKEN:
      return action.token;

    case AUTH_LOGOUT:
      return "";

    default:
      return state
  }
}

// token expires in min converted to milliseconds, 30min
function tokenExpiryTime(state = 1800000, action){
  switch(action.type){

    default:
      return state
  }
}

// interval in min converted to seconds, 10min
function refreshTokenTimeInterval(state = 600000, action){
  switch(action.type){

    default:
      return state
  }
}


const rootReducer = combineReducers({
  currentMenu,
  isDrawerShown,
  isGalleryOpen,
  galleryImages,
  galleryViewerImages,
  propertyTypes,
  priceRange,
  bedroomsRange,
  bathroomsRange,
  estates,
  filteredProperties,
  properties,
  selectedProperty,
  titles,
  publicityEntries,
  drawerMailFormData,
  snackbarData,
  forSaleFormData,
  unitSearchFormData,
  urls,
  showSelectedProperty,
  authToken,
  tokenExpiryTime,
  refreshTokenTimeInterval
})

export default rootReducer


//export default function rootReducer(state = {}, action) {
//     return {
//       reducerFuncName1: reducerFuncName1(state.reducerFuncName1, action),
//       reducerFuncName2: reducerFuncName2(state.reducerFuncName2, action),
//       reducerFuncName_N: reducerFuncName_N(state.reducerFuncName_N, action),
//     }
//   }