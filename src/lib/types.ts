export type Coin = {
      id: number;
      code: string;
      name: string;
      value: number;
    };
    
    export interface User {
      id: number
      username: string
      firstName: string
      lastName: string
      email: string
      plan: Plan
    }
    
    export interface UserForUpdate {
      id: number
      username: string
      firstName: string
      lastName: string
      planId: number
    }
    
    export interface Plan {
      id: number
      name: string
      limit: number
      price: number
    }
    
    export type Exchange = {
      id: number;
      fromCoin: Coin;
      toCoin: Coin;
      date: Date;
      amount: number;
    };
    
    export type ExchangeForCreate = {
      id: number;
      fromCoinId: number;
      toCoinId: number;
      date: Date;
      amount: number;
    };