import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {authCheckStateAsync} from './store/actions';

import './app.scss'
import MainLayout from './MainLayout/MainLayout'

export default function App(){
  const dispatch = useDispatch();
  
  // Check the authentication state
  useEffect(() => {
    dispatch(authCheckStateAsync())    
  });

      
  return <MainLayout/>
}