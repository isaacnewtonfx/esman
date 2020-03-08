import React from 'react'
import DrawerHome from './DrawerHome'
import DrawerSearch from './DrawerSearch/index'
import DrawerList from './DrawerList/index'
import DrawerMail from './DrawerMail/index'

import { connect, useSelector } from 'react-redux'

import {allProperties} from '../Map'


function Drawer(props){

    const filteredProperties = useSelector(state=>state.filteredProperties)

    return (
        <>

            {props.currentMenu === "home" && <DrawerHome showGalleryViewer= {props.showGalleryViewer}/>}

            {props.currentMenu === "search" && <DrawerSearch/>}

            {props.currentMenu === "list" && <DrawerList title="All Units" properties = {allProperties}/>}

            {props.currentMenu === "mail" && <DrawerMail/>}

            {props.currentMenu === "search_results" && <DrawerList title="Search Results" properties={filteredProperties}/>}

        </>
    )

}



// Connecting to the Store
const mapStateToProps = (state) =>{
    return {currentMenu: state.currentMenu}
}
  
export default connect(
    mapStateToProps
)(Drawer)