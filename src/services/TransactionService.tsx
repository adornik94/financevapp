import axios from 'axios';



export class TransactionService{


    private static URL:string = "http://localhost:1337"




    public static getAllTransactions(){

        //vratis se u server folder i vidis routes za get metodu 

        const transactionURL:string = `${this.URL}/transaction`
  
        return axios.get(transactionURL)
       
  }


}