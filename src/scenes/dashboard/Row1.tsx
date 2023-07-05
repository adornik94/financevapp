import React from 'react';
import {DashboardBox} from '../../components/DashboardBox';
import {ResponsiveContainer, AreaChart,CartesianGrid,XAxis,YAxis,Tooltip,Area} from "recharts";
import {useEffect,useState,useMemo} from 'react';
import axios, { toFormData } from "axios";
import { useTheme } from "@mui/material";
import BoxHeader from "../../components/BoxHeader";
import {IKpis,MonthlyDatum} from '../../state/types';
import {KpisService} from '../../services/KpisService';
import {LineChart,Legend,Line} from 'recharts';
import classes from  "./Row1.module.css";
import {
  BarChart,
  Bar} from 'recharts';

  



type Props = object;


interface IState{


  loading:boolean,
  kpis:IKpis[],
  errorMessage:string
}


const data = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
]




export const Row1: React.FC= ()=>{
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

  

  const {palette}  = useTheme();

const {loading,kpis,errorMessage} = state;
  

const data2 = kpis.map(kpi=>kpi.monthlyData.map(m=>{

 return {
    month: m.month.substring(0,3),
    revenue: Number(m.revenue), 
    expenses: Number(m.expenses)


 }

}));

console.log(data2[0]);

const data3 = data2[0];


const revenueProfit  = kpis.map(kpi=>kpi.monthlyData.map(m=>{
      return {
        name: m.month.substring(0, 3),
        revenue: Number(m.revenue),
        profit: (Number(m.revenue) - Number(m.expenses)).toFixed(2),
      };
    }))


    console.log(revenueProfit[0]);


 const data4 = revenueProfit[0];


 const revenueData = kpis.map(kpi=>kpi.monthlyData.map(m => {
      return {
        name: m.month.substring(0, 3),
        revenue: Number(m.revenue),
      };
  
    }));

const data5 = revenueData[0]; 


console.log(data5);


    return(
 
        <>
      <DashboardBox gridArea="a">
    
      <ResponsiveContainer  width = "85%" height= "85%" >
      <AreaChart width={730} height={250} data={data3}
  margin={{ top: 20, right: 10, left: 10, bottom: 10 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
  
  <XAxis dataKey="month"  tick={{ fill: '#eeeeff' }} tickLine={{ stroke: '#eeeeff' }}/>
  <YAxis tick={{ fill: '#eeeeff' }} tickLine={{ stroke: '#eeeeff' }} />
  <Tooltip />
  <Legend
              height={16}
              wrapperStyle={{
                paddingLeft: "10px", 
                paddingTop:"20px"
              }}
            />
  <Area type="monotone"  dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
  <Area type="monotone" dataKey="expenses" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>
    
</ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea= "b">
     
      <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={data4}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 35,
            }}
            >
            <CartesianGrid vertical={false} stroke="#eeeeff"  />
            <XAxis
              dataKey="name"
             
              style={{ fontSize: "10px"}}
           
            
            />
            <YAxis
              yAxisId="left"
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain = {[8000,2300]}
              tick={{ fill: '#eeeeff' }} 
            
            
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={{ stroke: '#eeeeff' }}
              axisLine={false}
              style={{ fontSize: "10px" }}
              tick={{ fill: '#eeeeff' }}
              
             
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
              dot= {false}
            
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
              dot= {false}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea= "c">
      <ResponsiveContainer width="100%" height="100%">
      <BarChart
      width={500}
      height={300}
      data={data5}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 20
      }}
    >
     
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="revenue" fill="#8884d8" />
     
    </BarChart>
    </ResponsiveContainer>
      </DashboardBox>
        </>
    )




}
