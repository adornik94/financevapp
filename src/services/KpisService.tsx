import axios from "axios"

export class KpisService{

  private static URL:string= 'http://localhost:1337'



public static getAllKpis(){

      const KpisURL:string = `${this.URL}/kpis`

      return axios.get(KpisURL)
     
}




}