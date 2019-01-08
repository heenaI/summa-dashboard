import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CirclesChart from './circles';

const styles = {
    card: {
      minWidth: 275,
    },
    title: {
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: '18px'
    },
    pos: {
      marginBottom: 12,
    },
  };
  

function CirclesCard(props){
    const { classes } = props;

    

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} gutterBottom>
                    Trending Entities - since last 24 hrs
                </Typography>
                
                <CirclesChart/>
                

            </CardContent>
        </Card>
    );
}

CirclesCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CirclesCard);