interface ProductProps {
  productId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Product {
  public product_id: string;

  public name: string;

  public description: string;

  public price: number;

  public stock: number;

  public created_at: Date;

  public readonly updated_at: Date;

  constructor({
    productId,
    name,
    description,
    price,
    stock,
    createdAt,
    updatedAt,
  }: ProductProps) {
    this.product_id = productId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.created_at = createdAt;
    this.updated_at = updatedAt;
  }
}
