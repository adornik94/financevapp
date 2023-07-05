import React from "react";

import {IUsers} from '../../state/types';
import {useState, useEffect}  from 'react';
import { UsersService } from "@/services/UsersService";


interface IState{

    loading:boolean,
    users:IUsers[],
    errorMessage:string
}


const Users: React.FC = ()=>{

    const [state,setState]= useState<IState>({
       loading: false, 
       users:[] as IUsers[],
        errorMessage:''

    });

//network request 

useEffect(()=>{


    setState({...state,loading:true})
     
   UsersService.getAllUsers().then(res=> setState({

      ...state, 
      loading:false, 
      users:res.data
   })).catch(err=> setState({

      ...state, loading:false, 
      errorMessage:err.message
   }))

},[])

const  {loading,users,errorMessage} = state

    return(
       <div className="container">
          <h1>Data from APIS</h1>
          {loading && <p>Loading...</p>}
          <table className= "table table-striped">
            <thead>
               <tr>
                <td>id</td>
                <td>name</td>
                <td>username</td>
                <td>email</td>
               </tr>
            </thead>
            <tbody>
               {
                users.length >0 && users.map(user=>(
                    <tr key = {user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  </tr>
                ))
               }
            </tbody>
          </table>
       </div>

    )

}



export default Users;