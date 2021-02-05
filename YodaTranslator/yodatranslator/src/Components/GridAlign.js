import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function GridAlign(props) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}/>
            <Grid item xs={4}>{props.children}</Grid>
            <Grid item xs={4}/>
        </Grid>
    )
}