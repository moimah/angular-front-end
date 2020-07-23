import { User } from './user';
export class Order{
  id: number;
  user: User;
  orderDate: Date;
  status: string;
}
