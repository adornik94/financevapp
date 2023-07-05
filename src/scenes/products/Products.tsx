import React from "react";

import {IProducts} from '../../state/types';
import {useState, useEffect}  from 'react';
import { ProductsService } from "../../services/ProductService";


interface IState{

    loading:boolean,
    products:IProducts[],
    errorMessage:string
}


const Products: React.FC = ()=>{

    const [state,setState]= useState<IState>({
       loading: false, 
       products:[] as IProducts[],
        errorMessage:''

    });

//network request 

useEffect(()=>{


    setState({...state,loading:true})
     
   ProductsService.getAllProducts().then(res=> setState({

      ...state, 
      loading:false, 
      products:res.data
   })).catch(err=> setState({

      ...state, loading:false, 
      errorMessage:err.message
   }))

},[])

const  {loading,products,errorMessage} = state

    return(
       <div className="container">
          <h1>Data from APIS</h1>
          {loading && <p>Loading...</p>}
          <table className= "table table-striped">
            <thead>
               <tr>
                <td>id</td>
                <td>price</td>
                <td>expense</td>
                <td>transaction</td>
               </tr>
            </thead>
            <tbody>
               {
                products.length >0 && products.map(p=>(
                    <tr key = {p._id}>
                  <td>{p._id}</td>
                  <td>{p.price}</td>
                  <td>{p.expense}</td>
                  <td>{p.transactions.map(tr=>(<p>{tr}</p>))}</td>
                  </tr>
                ))
               }
            </tbody>
          </table>
       </div>

    )

}



export default Products;