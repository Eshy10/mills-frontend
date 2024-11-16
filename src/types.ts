export interface Mill {
  id: string;
  latitude: number;
  longitude: number;
  millName: string;
  p1Amount: number;
  numTransactions: number;
  p1PriceTon: number;
  lastTransactionDate: Date;
}

export interface Dumpsite {
  location: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  _id?: string;
  latitude: number;
  longitude: number;
  // quantitySold: number;
  capacity: number;
  status: 'active' | 'inactive';
}
