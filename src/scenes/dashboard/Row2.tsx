import React from 'react';
import {DashboardBox} from '../../components/DashboardBox';
import {useEffect,useState,useMemo} from 'react';
import {IProducts} from '../../state/types';

import BoxHeader from "../../components/BoxHeader";
import  {ProductsService} from '../../services/ProductService';
import { ResponsiveContainer } from 'recharts';
import { LineChart } from 'recharts';
import { CartesianGrid } from 'recharts';
import { XAxis } from 'recharts';
import { YAxis } from 'recharts';
import { ZAxis } from 'recharts';
import { Tooltip } from 'recharts';
import { Legend } from 'recharts';
import {Line} from 'recharts';
import {KpisService} from '../../services/KpisService';
import {IKpis,MonthlyDatum} from '../../state/types';
import  FlexBetween from '../../components/FlexBetween';
import {PieChart}  from 'recharts';
import {Pie,Cell} from 'recharts'; 

import {Typography,Box, useTheme} from '@mui/material';

import {
  ScatterChart,
  Scatter}  from "recharts";



interface IState{


  loading:boolean,
  kpis:IKpis[],
  errorMessage:string
}


interface IPState{

 loading:boolean, 
 products: IProducts[], 
 errorMessage: string

}



const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];






export const Row2:React.FC= ()=>{



  const { palette } = useTheme();

  const [state,setState]= useState<IState>({
    loading: false, 
     kpis:[] as IKpis[],
     errorMessage:''

 });
  

const [productState,setProductState] = useState<IPState>({

 loading:false, 
 products: [] as IProducts[], 
 errorMessage: ''



})


 
 const pieColors = [palette.primary[800], palette.primary[300]];
 
useEffect(()=>{


  setProductState({...productState,loading:true})
    
  ProductsService.getAllProducts().then(res=> setProductState({
 
     ...productState, 
     loading:false, 
     products:res.data
  })).catch(err=> setProductState({
 
     ...productState, loading:false, 
     errorMessage:err.message
  }))
 
 },[]);


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








 const { kpis}  = state;

 const {products} = productState;

 console.log(products);





const productsExpenseData = products.map(p=>{

  return {
       id: p._id, 
       price: Number(p.price), 
       expense: Number(p.expense)
  }


})




const operationalData = kpis.map(kpi=>kpi.monthlyData.map(m=>{

  return {
     name: m.month.substring(0,3),
     "operational Expenses": Number(m.operationalExpenses),
     "nonOperational Expenses": Number(m.nonOperationalExpenses)
  }
 
 }));
 

 const dataoperational= operationalData[0];

 console.log(dataoperational);






    return (
        <>
          <DashboardBox gridArea="d">
          <ResponsiveContainer width="100%" height="100%">
          <LineChart
          
            data = {dataoperational}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 35,
            }}
            >
             <CartesianGrid  vertical= {false}/>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
              tick={{ fill: '#eeeeff' }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              orientation= "left"
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain = {[8000,2300]}
              tick={{ fill: '#eeeeff' }}
            
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              tick={{ fill: '#eeeeff' }}
             
            />
            <Tooltip />
            <Legend
              height={16}
              wrapperStyle={{
                paddingLeft: "10px", 
                paddingTop: "20px"
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="nonOperational Expenses"
              stroke={palette.tertiary[500]}
              dot= {false}
            
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="operational Expenses"
              stroke={palette.primary.main}
              dot= {false}
            />
          </LineChart>
        </ResponsiveContainer>
          </DashboardBox>
          <DashboardBox gridArea= "e">
          <BoxHeader  title="Campaigns and Targets" sideText="+4%" />
          <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#8884d8" />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            
          </Box>
      
          </FlexBetween>
          </DashboardBox>
          <DashboardBox gridArea="f">
         <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 40,
            bottom: 20,
            left: 20
          }}
        >
           <CartesianGrid strokeDasharray="3 3"  stroke={palette.grey[500]} /> 
          <XAxis type="number" dataKey="price" name="price" axisLine={false} tickLine= {false} 
            style={{fontSize: "10px"}}  tickFormatter={(v)=>`$${v}`} tick={{ fill: '#eeeeff' }} />
          <YAxis type="number" dataKey="expense" name="expense"   axisLine={false} tickLine= {false} style={{fontSize: "10px"}} tick={{ fill: '#eeeeff' }} />

          <ZAxis  type="number"  range= {[30]}  />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter= {(v)=>`$${v}`} />
          <Scatter name="A school"  fill={palette.tertiary[500]}  data= {productsExpenseData}/>
        </ScatterChart>
        </ResponsiveContainer>
            </DashboardBox>
        </>
    )





}
