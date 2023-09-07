interface IProduct {
  code: number | string;
  name: string;
  cost_price: string;
  sales_price: string;
}

interface IPack {
  id: number;
  pack_id: number;
  product_id: number;
  qty: number;
}

interface IRequestValidate {
  product_code: string;
  new_price: string;
}

type TValidatedProduct = Partial<IProduct> & {
  new_price: string;
  errors: string[];
};

export { IProduct, IPack, IRequestValidate, TValidatedProduct };
