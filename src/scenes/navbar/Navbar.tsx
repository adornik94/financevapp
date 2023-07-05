import React from "react";
import {useState} from "react";
import FlexBetween from "@/components/FlexBetween";
import {Link}  from "react-router-dom";
import {Box,Typography,useTheme}  from "@mui/material";
import PixOutlinedIcon from '@mui/icons-material/PixOutlined';
import logo from "../../assets/image_6483441.jpg";

type Props = object;

const Navbar = (props: Props)=>{

    const {palette} = useTheme(); // iskoristi paletu iz theme 
   
    const [selected,setSelected]  = useState("dashboard");

return (
  //we can have sudo selector directly on the component iteselfs
   <FlexBetween  mb = "0.25rem"  p = "0.5rem 0rem"  color = {palette.grey[700]}>
      <FlexBetween  gap = "0.75rem">
      <img src={logo} alt="Logo"  width= "80%" height= "80%" />
      </FlexBetween>
      <FlexBetween  gap = "2rem">
        {/*riht side */}
         <Box>
            <Link 
             to = "/" 
             onClick = {()=> setSelected("dashboard")}
             style = {{ color: selected === "dashboard"? "inherit": "#DDA0DD" ,
                        textDecoration: "inherit"}}>
              Dashbaord
              </Link>
         </Box>
         <Box><Link 
             to = "/predictions" 
             onClick = {()=> setSelected("predictions")}
             style = {{ color: selected === "predictions"? "inherit": "#DDA0DD" ,
                        textDecoration: "inherit"}}>
               Predictions
              </Link></Box>
      </FlexBetween>

   </FlexBetween>
)


}


export default Navbar;