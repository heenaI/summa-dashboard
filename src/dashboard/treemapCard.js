import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TreeMap from './treemap';

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
  

function TreemapCard(props){
    const { classes } = props;

    

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} gutterBottom>
                    Recent Trending Storylines
                </Typography>
                <TreeMap/>

            </CardContent>
        </Card>
    );
}

TreemapCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TreemapCard);