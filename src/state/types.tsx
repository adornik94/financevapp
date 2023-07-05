
export interface IProducts {
  _id: string;
  price:        number;
  expense:      number;
  transactions: string[];
}


export interface IKpis {
  _id: string;
  totalProfit:        number;
  totalRevenue:       number;
  totalExpenses:      number;
  monthlyData:        MonthlyDatum[];
  dailyData:          DailyDatum[];
  expensesByCategory: ExpensesByCategory;
}

export interface DailyDatum {
  _id: string;
  date:     string;
  revenue:  number;
  expenses: number;
}

export interface ExpensesByCategory {
  salaries: number;
  supplies: number;
  services: number;
}

export interface MonthlyDatum {
  _id: string;
  month:                  string;
  revenue:                number;
  expenses:               number;
  operationalExpenses:    number;
  nonOperationalExpenses: number;
}




export interface IUsers {
  id:       number;
  name:     string;
  username: string;
  email:    string;
  address:  Address;
  phone:    string;
  website:  string;
  company:  Company;
}

export interface ITransactions {
  _id: string;
  amount:     number;
  buyer:      string;
  productIds: string[];
}




export interface Address {
  street:  string;
  suite:   string;
  city:    string;
  zipcode: string;
  geo:     Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name:        string;
  catchPhrase: string;
  bs:          string;
}





