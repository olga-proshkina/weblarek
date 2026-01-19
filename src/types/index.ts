export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: string | null;
  email: string;
  phone: string;
  address: string;
}

export type PostOrderData = IBuyer & {
  total: number,
  items: string[];
};

export type PostOrderDataResult = {
   id: string,
   total: number
}

export type GetProduct = {
  items: IProduct[],
  total: number
}

export type ValidationResult = { validationMessage: string }