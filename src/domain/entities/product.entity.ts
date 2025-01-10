interface ProductProps {
  product_id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

export class Product {
  public product_id: string;
  public name: string;
  public description: string;
  public price: number;
  public stock: number;
  public created_at: Date;
  public readonly updated_at: Date;

  constructor(
    { product_id, name, description, price, stock, created_at, updated_at }: ProductProps,
  ) {
    this.product_id = product_id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
