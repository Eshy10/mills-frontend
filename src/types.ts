export interface Mill {
  id: string;
  latitude: number;
  longitude: number;
  quantitySold: number;
  averagePricePerTon: number;
  transactionCount: number;
  lastTransactionDate: string;
}

export interface Dumpsite {
  id?: string;
  latitude: number;
  longitude: number;
  // quantitySold: number;
  capacity: number;
  status: 'active' | 'inactive';
}
