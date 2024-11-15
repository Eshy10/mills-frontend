export interface Mill {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  p1Amount: number;
  numTransactions: number;
  p1PriceTon: number;
  transactions: number;
  lastTransactionDate: Date;
}

export interface Dumpsite {
  id?: string;
  latitude: number;
  longitude: number;
  // quantitySold: number;
  capacity: number;
  status: 'active' | 'inactive';
}
