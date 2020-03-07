const axios = require('axios').default;


/*
 * action types
 */
export const BACKEND_DOMAIN = 'https://backend.survtechengineering.com/estateman'
export const SHOW_MENU = 'SHOW_MENU'
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export const SHOW_DRAWER = 'SHOW_DRAWER'
export const REINDEX_CLICKED_IMAGE = 'REINDEX_CLICKED_IMAGE'
export const SET_GALLERY_OPEN_STATUS = 'SET_GALLERY_OPEN_STATUS'
export const UPDATE_DRAWER_MAIL_FORM_DATA = 'UPDATE_DRAWER_MAIL_FORM_DATA'
export const UPDATE_SNACKBAR_DATA = 'UPDATE_SNACKBAR_DATA'
export const UPDATE_FOR_SALE_FORM_DATA = 'UPDATE_FOR_SALE_FORM_DATA'
export const UPDATE_UNIT_SEARCH_FORM_DATA = 'UPDATE_UNIT_SEARCH_FORM_DATA'
export const SET_SELECTED_PROPERTY = 'SET_SELECTED_PROPERTY'
export const SET_PROPERTIES = 'SET_PROPERTIES'
export const SET_SELECTED_PROPERTY_VISIBILITY = 'SET_SELECTED_PROPERTY_VISIBILITY'
export const SET_FILTERED_PROPERTIES = 'SET_FILTERED_PROPERTIES'
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

/*
 * other constants
 */



/*
 * action creators
 */

export function showMenu(menu) {
  return { type: SHOW_MENU, menu }
}

export function toggleDrawer() {
  return { type: TOGGLE_DRAWER }
}

export function showDrawer() {
  return { type: SHOW_DRAWER }
}


export function reindexClickedImage(index, imgName) {
  return {
    type: REINDEX_CLICKED_IMAGE, payload: { index, imgName }
  }
}

export function setGalleryOpenStatus(status) {
  return { type: SET_GALLERY_OPEN_STATUS, status }
}

export function updateDrawerMailFormData(payload){
  return {type: UPDATE_DRAWER_MAIL_FORM_DATA, payload}
}

export function updateForSaleFormData(payload){
  return {type: UPDATE_FOR_SALE_FORM_DATA, payload}
}

export function updateSnackbarData(payload){
  return {type: UPDATE_SNACKBAR_DATA, payload}
}

export function updateUnitSearchFormData(payload){
  return {type: UPDATE_UNIT_SEARCH_FORM_DATA, payload}
}

export function setProperties(payload){
  return {type: SET_PROPERTIES, payload}
}

export function setSelectedProperty(payload){
  return {type: SET_SELECTED_PROPERTY, payload}
}

export function setSelectedPropertyVisibility(payload){
  return {type: SET_SELECTED_PROPERTY_VISIBILITY, payload}
}

export function setFilteredProperties(payload){
  return {type: SET_FILTERED_PROPERTIES, payload}
}

export function setAuthToken(token){
  return {type: SET_AUTH_TOKEN, token}
}

export function authLogout(){

  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');

  return {type: AUTH_LOGOUT}
}


// export const checkAuthTimeoutAsync = expirationTime=>{
//   return dispatch => {
//     setTimeout( ()=>{

//       //async code here
//       console.log("logging user out");
//       dispatch(authLogout());

//     },expirationTime)
//   }
// }

export const authCheckStateAsync = ()=>{

  return dispatch => {
    const token = localStorage.getItem('token');

    if(!token){
      dispatch(authLogout);
    }else{

      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if(expirationDate > new Date()){
        dispatch(setAuthToken(token));
      }else{
        dispatch(authLogout);
      }

    }
  }

}


export const refreshTokenAtIntervals = (token, url, tokenExpiryTime, refreshTokenTimeInterval)=>{

  return dispatch => {

    setInterval(()=>{ 
      
       axios.post(url, {token:token}, {withCredentials: true}) 
       .then(function (response) {
 
                
         if(response.status === 200 && response.data.token.split(".").length === 3){
           
          //store the token in localstorage
          localStorage.setItem('token', response.data.token);

          const expirationDate = new Date(new Date().getTime() + tokenExpiryTime);
          localStorage.setItem('expirationDate', expirationDate);

          dispatch(setAuthToken(response.data.token));

         }else{
           console.log("A problem occured refreshing token");
           console.log(response);
         }
   
       })
       .catch(function (error) {
         console.log(error);
       })
       .finally(function () {
         // always executed
       }); 

    }, refreshTokenTimeInterval); //3min

  }

}