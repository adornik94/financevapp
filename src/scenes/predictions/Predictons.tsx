import React from 'react';
import Users from '../user/Users';
import Kpis from '../kpis/Kpis';
import Products from '../products/Products';
import {useTheme}  from '@mui/material';
import { KpisService } from "@/services/KpisService";
import { useState,useEffect } from 'react';
import {IKpis}  from '../../state/types';
import { DashboardBox } from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import {Typography,Box} from '@mui/material';
import {themeSettings} from '../../theme';
import {Button} from '@mui/material';
import {LineChart,Legend,Line} from 'recharts';
import {ResponsiveContainer,CartesianGrid,XAxis,YAxis,Tooltip,Label} from "recharts";





interface IState{


  loading:boolean,
  kpis:IKpis[],
  errorMessage:string
}
interface regressor{

  slope:number, 
  intercept:number,
  y_hat:number[]
}


type DataPoint = [number,number];

export const Predictions: React.FC = ()=>{

// users,kpis,products firstly were on this page
const {palette}  = useTheme(); 

const [isPredictions,setIsPredictions] = useState(false);
const [state,setState]= useState<IState>({
  loading: false, 
  kpis:[] as IKpis[],
   errorMessage:''

});



useEffect(()=>{


  setState({...state,loading:true})
    
  KpisService.getAllKpis().then(res=> setState({
 
     ...state, 
     loading:false, 
     kpis:res.data
  })).catch(err=> setState({
 
     ...state, loading:false, 
     errorMessage:err.message
  }))
 
 },[])

const {kpis} = state;


const data2 = kpis.map(kpi=>kpi.monthlyData.map(m=>{

  return {
     month: m.month.substring(0,3),
     revenue: Number(m.revenue), 
     expenses: Number(m.expenses)
 
 
  }
 
 }));

 const x_values =kpis.map(kpi=>kpi.monthlyData.map((m,i:number)=>i))[0]

console.log(x_values);

const y_values =kpis.map(kpi=>kpi.monthlyData.map((m,i:number)=>{

const rev = Number(m.revenue);
return rev;

}))[0]; 

const x_mean = x_values!=null? x_values.reduce((a, b) => a + b, 0)/x_values.length:null;

const y_mean = y_values!=null ?y_values.reduce((a, b) => a + b, 0)/y_values.length:null;


const regressor :regressor={slope:0,intercept:0,y_hat:[]};

let sl= 0;
let slope_numerator = 0; 
let slope_denominator = 0;
for(let i=0; i<12; i++){
  slope_numerator += (x_mean!=null && y_mean!=null && x_values!=null && y_values!=null)?(x_values[i]-x_mean)*(y_values[i]-y_mean):0;
  slope_denominator +=x_mean!=null&& x_values!=null? Math.pow((x_values[i]-x_mean),2):0;
}

sl = slope_numerator/slope_denominator;



regressor.slope= sl;

const intercept = (y_mean!=null && x_mean!=null)?y_mean - x_mean*sl:0;

regressor.intercept = intercept;

console.log(regressor);


const y_hat = [];
for(let i=0; i<12; i++){
  
  y_hat.push(x_values!=null? x_values[i]*regressor['slope']+regressor['intercept']:0);
}

regressor.y_hat = y_hat;

console.log(y_hat);
const formattedData = kpis!=null? kpis.map(kpi=>kpi.monthlyData.map((m,i)=>{

  return {
     name: m.month.substring(0,3),
     actualRevenue: Number(m.revenue),
     regressionLine:regressor.y_hat[i]
 
  }
 
 }))[0]:[];

 console.log(formattedData);

  return(

     <DashboardBox  width= "100%" height= "100%" p= "2.5rem"  overflow= "hidden">
      
        <FlexBetween  m= "1rem 2.5rem">
             <Box  sx= {{marginLeft: "100px"}}>
              <Typography  style = {{color:"#DDA0DD"}}>Revenue and Prediction</Typography>
              <Typography style= {themeSettings.typography.h5}>Revenue and regression line based on linear  regression algorithm to  see what the model predicts
              <br/> and then use the predictions against 
              the true revenue values.</Typography>
             </Box>
        </FlexBetween>
        <ResponsiveContainer width="100%" height="100%">
        <LineChart data = {formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[600]} />
          <XAxis dataKey="name"  style={{ fontSize: "10px" }} 
           tick={{ fill: '#eeeeff' }} tickLine={{ stroke: '#eeeeff' }}>
            <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[12000, 26000]}
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
            tick={{ fill: '#eeeeff' }} 
            tickFormatter={(v) => `$${v}`}
            tickLine={{ stroke: '#eeeeff' }}
          >
            <Label
              value="Revenue in USD"
              angle={-90}
              offset={-5}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip/>
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="actualRevenue"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dot={false}
            dataKey="regressionLine"
            stroke="#DDA0DD"
           
          />
          {isPredictions && (
            <Line
              strokeDasharray="5 5"
              dataKey="Predicted Revenue"
              stroke={palette.primary[100]}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
          
     </DashboardBox>


  )
          

}

