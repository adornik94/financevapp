import mongoose from "mongoose";



const monthSchema = mongoose.Schema(
    {
      month: String,
      revenue: {
        type: String
       
      },
      expenses: {
        type: String
        
      },
      operationalExpenses: {
        type: String
      
      },
      nonOperationalExpenses: {
        type:String
      
      },
    }
   
  );

  const daySchema = mongoose.Schema({
    
    date: String,
    revenue:{ type:String}, 
    expenses:{type: String}


  })


const KPISchema = mongoose.Schema(
    {
      totalProfit: {type: String}
      ,
      totalRevenue: {  type:String },
      totalExpenses: {
       type:String
      },
      expensesByCategory: {
        type: Map,
        of: {
          type: String
        },
      },
      monthlyData: [monthSchema],

      dailyData: [daySchema]
    
    },
  
  );
  
  export const KPI = mongoose.model("KPI", KPISchema);