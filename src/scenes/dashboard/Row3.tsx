import { useEffect,useState,useMemo } from "react";
import {DashboardBox} from "../../components/DashboardBox";
import { ITransactions,IKpis,IProducts } from "@/state/types";
import { TransactionService } from "@/services/TransactionService";
import { KpisService } from "@/services/KpisService";
import { ProductsService } from "@/services/ProductService";

import React from 'react';
import {useTheme}  from "@mui/material";
import { DataGrid,GridCellParams } from '@mui/x-data-grid';
import {Box} from "@mui/material";

import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';




interface IState{


  loading:boolean,
   transactions:ITransactions[],
  errorMessage:string
}

interface IKState{


  loading:boolean,
  kpis:IKpis[],
  errorMessage:string
}



interface IPState{

  loading:boolean, 
  products: IProducts[], 
  errorMessage: string
 
 }



 

 const productColumns = [
  {
    field: "id",
    headerName: "id",
    flex: 1,
  },
  {
    field: "expense",
    headerName: "Expense",
    flex: 0.5,
    renderCell: (params: GridCellParams) => `$${params.value}`,
  },
  {
    field: "price",
    headerName: "Price",
    flex: 0.5,
    renderCell: (params: GridCellParams) => `$${params.value}`,
  },
];


const transactionColumns = [
  {
    field: "id",
    headerName: "id",
    flex: 1,
  },
  {
    field: "buyer",
    headerName: "Buyer",
    flex: 0.67,
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 0.35,
    renderCell: (params: GridCellParams) => `$${params.value}`,
  },
  {
    field: "count",
    headerName: "Count",
    flex: 0.1
  },
];



 export const Row3: React.FC = ()=>{
    


  const [state,setState]= useState<IState>({
    loading: false, 
     transactions:[] as ITransactions[],
     errorMessage:''

 });

 const [kpisState,setKpisState]= useState<IKState>({
  loading: false, 
  kpis:[] as IKpis[],
   errorMessage:''

});


const [productState,setProductState] = useState<IPState>({

  loading:false, 
  products: [] as IProducts[], 
  errorMessage: ''
 
 
 
 })

 const { palette } = useTheme();



 useEffect(()=>{


  setState({...state,loading:true})
    
   TransactionService.getAllTransactions().then(res=> setState({
 
     ...state, 
     loading:false, 
     transactions:res.data
  })).catch(err=> setState({
 
     ...state, loading:false, 
     errorMessage:err.message
  }))
 
 },[])


 useEffect(()=>{


  setKpisState({...kpisState,loading:true})
    
  KpisService.getAllKpis().then(res=> setKpisState({
 
     ...kpisState, 
     loading:false, 
     kpis:res.data
  })).catch(err=> setKpisState({
 
     ...kpisState, loading:false, 
     errorMessage:err.message
  }))
 
 },[])

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




const {transactions}= state;




const transactionsData= transactions.map(t=>{

  return  {

     id: t._id, 
     buyer: t.buyer, 
     amount: Number(t.amount), 
     count: t.productIds.length

  }


})
 console.log(transactionsData);



const {products} = productState;




const productsExpenseData = products.map(p=>{

  return {
       id: p._id, 
       price: Number(p.price), 
       expense: Number(p.expense)
  }


})

console.log(productsExpenseData)


return(

<>
  <DashboardBox   gridArea= "g">

      <p  style= {{color: "#eeeeff" ,fontSize: "12px" , marginLeft: "20px"}}>List of products </p>
      <Box  mt= "0.5rem"  p= "0 0.5rem" height= "75%"  sx= {{
         "& .MuiDataGrid-root":{
             color: palette.grey[300],     
             border: "none"       

         }, 

         "& .MuiDataGrid-cell": {
          borderBottom: `1px solid ${palette.grey[500]} !important`,
        },
        "& .MuiDataGrid-columnHeaders": {
          borderBottom: `1px solid ${palette.primary.main} !important`,
        },
        "& .MuiDataGrid-columnSeparator": {
          visibility: "hidden",
        },
        

      }}>
      <DataGrid   columnHeaderHeight={25}
            rowHeight={40}
            hideFooter={true}
            rows={productsExpenseData || []}
            columns={productColumns} 
            />
    </Box>
  </DashboardBox>
  <DashboardBox  gridArea= "h">
  <p  style= {{color: "#eeeeff" ,fontSize: "12px" , marginLeft: "20px"}}>Recent orders</p>
      <Box  mt= "0.5rem"  p= "0 0.5rem" height= "75%"  sx= {{
         "& .MuiDataGrid-root":{
             color: palette.grey[500],     
             border: "none"       

         }, 

         "& .MuiDataGrid-cell": {
          borderBottom: `1px solid ${palette.grey[500]} !important`
        },
        "& .MuiDataGrid-columnHeaders": {
          borderBottom: `1px solid ${palette.primary.main} !important`
        },
        "& .MuiDataGrid-columnSeparator": {
          visibility: "hidden"
        }
        

      }}>
      <DataGrid   columnHeaderHeight={25}
            rowHeight={40}
            hideFooter={true}
            rows={transactionsData || []}
    columns={transactionColumns} />
    </Box>
  </DashboardBox>
  
</>

)


}


