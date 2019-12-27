import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from "react-redux";
import {resizeMap} from './Map'

import {
  showMenu,
  toggleDrawer,
  showDrawer
} from '../store/actions'

let classNames = require('classnames')


const Menu = props => {

    const authToken = useSelector(state => state.authToken);
    const currentMenu = useSelector(state => state.currentMenu);
    const isDrawerShown = useSelector(state => state.isDrawerShown);
    const dispatch = useDispatch();

    const homeActiveClassName = classNames({active: currentMenu === 'home'})
    const searchActiveClassName = classNames({active: currentMenu === 'search'})
    const listActiveClassName = classNames({active: currentMenu === 'list'})
    const mailActiveClassName = classNames({active: currentMenu === 'mail'})


    const handleShowMenu = menu =>{
        dispatch(showMenu(menu))
        dispatch(showDrawer())
    }

    const handleShowHideClick = ()=>{
        dispatch(toggleDrawer());

        setTimeout(function(){resizeMap()}, 500);
    }


    return (
        <>
            <a title="Home" className={homeActiveClassName} href="#" onClick={()=>handleShowMenu('home')}> <FontAwesomeIcon icon="home" size="2x" /> </a>

            <a title="Search" className={searchActiveClassName} href="#" onClick={()=>handleShowMenu('search')}> <FontAwesomeIcon icon="search" size="2x" /> </a>

            <a title="Listings" className={listActiveClassName} href="#" onClick={()=>handleShowMenu('list')}> <FontAwesomeIcon icon="list" size="2x" />  </a>

            <a title="Enquiry" className={mailActiveClassName} href="#" onClick={ ()=> handleShowMenu('mail')}> <FontAwesomeIcon icon="envelope" size="2x" /> </a>

            {
                authToken==""? <a title="Sign In" href='/signin'> <FontAwesomeIcon  icon="user-slash" size="2x" /> </a> : 
                <a title="Signed In" href="#"> <FontAwesomeIcon  icon="user-check" size="2x" /> </a>
            }

            <a title="Show/Hide Drawer" href="#" onClick={ ()=> handleShowHideClick()}> 
                {
                    isDrawerShown ? 
                    <FontAwesomeIcon icon="arrow-left" size="2x" /> : 
                    <FontAwesomeIcon icon="arrow-right" size="2x" />
                }
            </a>

        </>
    )
}

  
export default Menu