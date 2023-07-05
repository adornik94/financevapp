import axios from "axios"


export class ProductsService{

    private static URL:string= 'http://localhost:1337'
  
  
  
  public static getAllProducts(){
  
        const ProductsURL:string = `${this.URL}/products`
  
        return axios.get(ProductsURL)
       
  }
  
  
  
  
  }