import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles({
  root: {
    width:'100%'
  },
  mediachat: {
    height: 140,
    backgroundColor:'#03a9f4'
  },
  mediacustomers: {
    height: 140,
    backgroundColor:'#00bcd4'
  },
  mediainventory: {
    height: 140,
    backgroundColor:'#009688'
  },
  flexGrow:{
      flexGrow: 1,
      margin: 'auto'
  },
  flexCenter:{
      justifyContent: 'center'
  }
});
export default function Landing(){
    const classes = useStyles();
    const toolCard = names => {
        let rt = []
        for(let name in names){
            let lower = names[name].toLowerCase()
            rt.push(
                <Grid item xs={6} sm={3}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <Link to={`/${lower}`}>
                                <CardMedia
                                    className={classes[`${'media'+lower}`]}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {names[name].toUpperCase()}
                                    </Typography>
                                </CardContent>
                            </Link>
                        </CardActionArea>
                    </Card>
                </Grid>
            );
        }
        return rt
    }
    const tools = ['chat', 'customers', 'inventory']
    return (
        <div className={classes.flexGrow}>
            <Grid container spacing={3} className={classes.flexCenter}>
                {toolCard(tools)}
            </Grid>
        </div>
    )
};
