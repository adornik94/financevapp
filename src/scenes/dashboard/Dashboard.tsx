import React from "react";

import {Box,useMediaQuery,useTheme} from "@mui/material";
import { themeSettings } from "@/theme";
import {DashboardBox} from "../../components/DashboardBox";
import {Row1} from '../dashboard/Row1';
import {Row2} from '../dashboard/Row2';
import {Row3} from '../dashboard/Row3';
import axios from 'axios';
import {useEffect,useState} from 'react';
import Users from '../user/Users';



type Props = object;

const gridTemplateLargeScreens= `
"a b c"
"a b c"
"a b c"
"a b f"
"d e f"
"d e f"
"d h h"
"g h h"
"g h h"
"g h h"
"g h h"
"g h h"
`;

const gridTemplateSmallScreens =`

"a"
"a"
"a"
"a"
"b"
"b"
"b"
"c"
"c"
"c"
"d"
"d"
"d"
"e"
"e"
"f"
"f"
"f"
"g"
"g"
"g"
"g"
"g"
"h"
"h"
"h"
"h"
"h"
"h"
"h"
`;



const Dashboard =(props: Props)=>{


const [kpis,setKpis] = useState([]);



const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)"); // determine whether is hight min 

// we can add different template for small screens 


  const {palette} = useTheme();




  return <Box  width="100%"  height ="100%"  display = "grid" color= {palette.grey[300]}  gap= "1.5rem"
      sx = {
         isAboveMediumScreens?
        {gridTemplateAreas:gridTemplateLargeScreens  , gridTemplateColumns: "repeat(3,minmax(370px,1fr))",
            gridTemplateRows: "repeat(10,minmax(60px,1fr))", }:{
              
gridTemplateAreas: gridTemplateSmallScreens, 
gridAutoColumns: "1fr", 
gridAutoRows: "80px", 


            }}> 
        
        <Row1></Row1>
        <Row2></Row2>
        <Row3></Row3>

      </Box>

}


export default Dashboard;

/*
  gridColumn gridRow you can determine how long grid specify , 
  ypu can take a look at all of this, grid area is very special 




*/