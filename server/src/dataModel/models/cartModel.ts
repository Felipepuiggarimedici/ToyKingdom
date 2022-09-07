import Product from "./productModel";

class Cart {
    readonly id : string;
    timestamp : Date;
    readonly productList: Map<string, number>;

    constructor (id? : string, productList?: Map<string, number>){
        id ? this.id = id: this.id = "Temporal ID";
        this.timestamp = new Date();
        productList ? this.productList = productList : this.productList = new Map();
    }
    addProduct (id : string): Boolean {
        if (id === "Temporal ID") {
            return false;
        } else if (this.productList.has(id)) {
            this.productList.set(id, this.productList.get(id) + 1);
            return true;
        } else {
            this.productList.set(id, 1);
        }
        this.timestamp = new Date();
        return true;
    }
    subtractProduct (id : string): Boolean {
        if (id === "Temporal ID" || !this.productList.has(id)) {
            return false;
        } else if (this.productList.get(id) === 1) {
            this.productList.delete(id);
        } else {
            this.productList.set(id, this.productList.get(id) - 1);
        }
        this.timestamp = new Date();
        return true;
    }
    deleteProduct (id : string): Boolean {
        if (id === "Temporal ID") {
            return false;
        } else {
            this.productList.delete(id);
        }
        this.timestamp = new Date();
        return true;
    }
}
export default Cart;