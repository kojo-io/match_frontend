export interface AllProjectGateways {
  name: string;
  list: AllProjectGatewaysChild [];
  total: number;
}

export interface AllProjectGatewaysChild{
  date: string;
  gateway:string;
  transactionId: string;
  amount: number;
}

export interface DisplayData {
  list: AllProjectGateways [],
  total: number;
}
