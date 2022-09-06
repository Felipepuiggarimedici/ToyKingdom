class Product {
    readonly id: string;
    readonly productName: string;
    readonly description: string;
    timestamp: Date;
    readonly image: string;
    readonly price: number;
    readonly index: number;
    stock: number;
    constructor (productName: string, description: string, image: string, price: number, stock: number, id?: string) {
        id ? this.id = id: this.id = "Temporal ID";
        this.timestamp = new Date();
        this.productName = productName;
        this.description = description;
        this.image = image;
        this.price = price;
        this.stock = stock;
    }
}
export default Product;