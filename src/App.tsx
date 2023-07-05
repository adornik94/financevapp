import { createTheme } from '@mui/material/styles';
import { useState } from 'react';
import {Route, Routes} from   "react-router-dom";
import {Box} from "@mui/material";  
  import {useMemo} from "react"; 
import {themeSettings}  from "./theme";
import {CssBaseline, ThemeProvider}  from "@mui/material";
import {BrowserRouter}  from "react-router-dom";
import Navbar from "@/scenes/navbar/Navbar";
import {Predictions} from '@/scenes/predictions/Predictons';
import Dashboard from '@/scenes/dashboard/Dashboard';




function App(){ 

  const theme = useMemo(()=> createTheme(themeSettings),[]);
 

  return (<div className="app">
<BrowserRouter>
    <ThemeProvider  theme = {theme}>
                <CssBaseline/> 
                <Navbar/> {/*bascially i am setting default font size , padding  */}
                    <Box  width = "100%"  height = "100%"  padding= "1rem 2rem 4rem 2rem">
                       <Routes>
                          <Route  path ="/" element ={<Dashboard/>} />
                          <Route  path = "/predictions"  element = {<Predictions/>}/>
                       </Routes>
                    </Box> 
    </ThemeProvider>
  </BrowserRouter>
    </div>
  )


}
  
export default App;
