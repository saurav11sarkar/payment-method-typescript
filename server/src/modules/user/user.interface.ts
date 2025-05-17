export interface IUser {
  name: string;
  email: string;
  password: string;
  status?: "active" | "inactive";
  accountType: "savings" | "current";
  image?: string;
  balance?: number;
  phone?: string;
  address?: string;
}

