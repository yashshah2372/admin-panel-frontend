import React from "react";
import {
    Grid
} from '@mui/material'
import Sidebar from "../components/Sidebar";

const PageLayout = ({ children }) =>{
    const loggedIn = true ;
    return (
        <Grid container>
          <Grid item md={2} display={!loggedIn ? 'none' : ''}>
            <Sidebar />
          </Grid>    
          <Grid item md={!loggedIn ? 12 : 10} sx={{p: 4}}>
            {children}
          </Grid>     
        </Grid>
      )
};

  export default PageLayout;