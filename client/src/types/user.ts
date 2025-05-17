export type User = {
  id: string;
  email: string;
  status: string;
  iat: number;
  exp: number;
  name?: string;
  image?: string;
};
