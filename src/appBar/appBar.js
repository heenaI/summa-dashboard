import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from './logo.png'
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      textAlign: 'left',
      paddingLeft: '6%'
    },
    // menuButton: {
    //   marginLeft: -12,
    //   marginRight: 20,
    // },
  };
  
  function ButtonAppBar(props) {
    const { classes } = props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
          <img src={logo} alt="Logo" width="130px" aria-label="Menu" className={classes.grow}></img>
            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
  ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ButtonAppBar);