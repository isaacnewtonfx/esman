import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListingTable from './ListingTable'

import {selectFeatureOnMap} from '../Map'

const useStyles = makeStyles(theme => ({
    grid: {
      paddingTop: 16,
      paddingLeft:16
    },
    noSpaces:{
      padding:0,
      margin:0
    },
    h4:{
      marginTop:5,
      padding:0,
      color:"gray"
    },
    icon:{
      cursor: 'pointer'
    }  
  }));


export default function DrawerList(props){
    const classes=useStyles();

    return (

      <>
        <Grid container className={classes.grid}>
            <Grid item xs={10}>
                <h2 className={classes.noSpaces}>{props.title} </h2>
                <h4 className={classes.h4}>{props.properties.length} unit(s)</h4> 
            </Grid>
        </Grid>

        {
          props.properties.length > 0 ? 
          <ListingTable rows = {props.properties} selectFeatureOnMap={selectFeatureOnMap}/> : 
          <p style={{marginLeft:15}}>No records available</p>
        }
        
      </>
    )
}