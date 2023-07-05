import React  from 'react'; 
import { KpisService } from '@/services/KpisService';
import {IKpis,MonthlyDatum, DailyDatum}  from '../../state/types';
import {useState,useEffect} from 'react';


interface IState{


    loading:boolean,
    kpis:IKpis[],
    errorMessage:string
}



const Kpis: React.FC = ()=>{


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


    const  {loading,kpis,errorMessage} = state

return(

  
         <div className="container">
          <h1>Data from APIS</h1>
          {loading && <p>Loading...</p>}
          <table className= "table table-striped">
            <thead>
               <tr>
                <td>id</td>
                <td>month</td>
                <td>revenue
                </td>
                <td>expenses</td>
               </tr>
            </thead>
            <tbody>
               {
                kpis.length >0 && kpis.map(kpi=>(
                    kpi.monthlyData?.map(m=>(
                     <tr key = {m._id}>
                    <td>{m._id}</td>
                    <td>{m.month.substring(0,3)}</td>
                    <td>{m.revenue}</td>
                    <td>{m.expenses}</td>
                    </tr>

                  ))))}
            
            </tbody>
          </table>
         
       </div>
   
)



}


export default Kpis;