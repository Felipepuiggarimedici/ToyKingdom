import retrieveProducts from "../../dataAccessLayer/productAccess/retrieveProductsFromApi";
import Product from "../models/productModel"

const getProducts = async ():Promise<Array<Product> | string> => {
    try {
        const unformattedProducts : Array<any> | string = await retrieveProducts();
        if (typeof unformattedProducts === "string") {
            return `Products could not be retrieved. ${unformattedProducts}`;
        }
        const productList = unformattedProducts.map((productToFormat) => {
            return new Product(productToFormat.productName, productToFormat.description, productToFormat.image, productToFormat.price, productToFormat.stock, productToFormat.id)
        })
        return productList;
    } catch(error) {
        return `Products could not be formatted: ${error}`
    }
}
export default getProducts;