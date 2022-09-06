import retrieveIndividualProduct from "../../dataAccessLayer/productAccess/retrieveIndividualProduct";
import Product from "../models/productModel"

const getProduct = async (id : string):Promise<Product | string> => {
    try {
        const unformattedProduct = await retrieveIndividualProduct(id);
        if (typeof unformattedProduct === "string") {
            if (unformattedProduct === "Id does not exist") {
                return "Id does not exist";
            }
            return `Products could not be retrieved. ${unformattedProduct}`;
        }
        const product = new Product(unformattedProduct.productName, unformattedProduct.description, unformattedProduct.image, unformattedProduct.price, unformattedProduct.stock, unformattedProduct.id);
        return product;
    } catch(error) {
        return `Products could not be formatted: ${error}`
    }
}
export default getProduct;