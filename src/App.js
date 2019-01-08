import React, { Component } from 'react';
import './App.css';
import AppBar from './appBar/appBar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TreeMap from './dashboard/treemapCard';
import CirclesCard from './dashboard/circlesCard';
require('dotenv').config()




const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
      primary: {
          main: '#0b5994',
      },
      secondary: {
          main: '#1d83c6',
      },
  },
});


class App extends Component {
  
  render() {
    return (
      <div className="App">
      
        <MuiThemeProvider theme={theme}>
          <AppBar/>
          
          <Grid container={true} spacing={24} alignItems="center" justify="center" className="App-header">

            <Grid item xs={12} sm={6}>
              <TreeMap />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <CirclesCard/>
            </Grid>
          
          </Grid>
        
         
        
        </MuiThemeProvider>
        
      </div>
    );
  }
}

export default App;
