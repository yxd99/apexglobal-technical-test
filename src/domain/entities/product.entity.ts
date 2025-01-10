export class Product {
  constructor(
    public readonly product_id: string,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) {}
}
