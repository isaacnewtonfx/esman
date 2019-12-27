import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

function CardWrapper(props){

    const useStyles = makeStyles(theme => ({
                        cardContent:{
                            paddingTop:props.paddingTop,
                            paddingBottom:0
                        },
                        grid:{
                            height: props.height
                        }
                    }));


   const classes = useStyles();

    return (
        <>

            <Card raised={true}>
                <CardContent className={classes.cardContent}>
                    <Grid
                        className={classes.grid}
                        container
                        direction={props.direction}
                        justify={props.justify}
                        alignItems={props.alignItems}
                        
                    >
                        <Grid item xs={12}>

                            {props.children}

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </>
    )

}


export default CardWrapper