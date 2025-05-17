import { Types } from "mongoose";

export interface IOrder {
  userId: Types.ObjectId;
  amount: number;
  currency?: string;
  paidStatus?: boolean;
  tranjectionId?: string;
}
