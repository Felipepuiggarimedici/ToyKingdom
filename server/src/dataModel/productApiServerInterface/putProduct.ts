import changeProduct from "../../dataAccessLayer/productAccess/changeProduct";
import Product from "../models/productModel";

const putProduct = async(unformattedProduct : any) : Promise<string> => {
    if (!unformattedProduct.productName || !unformattedProduct.description || !unformattedProduct.image || !unformattedProduct.price || !unformattedProduct.stock) {
        return "Product information missing";
    }
    try {
        const productToSave = new Product(unformattedProduct.productName, unformattedProduct.description, unformattedProduct.image, unformattedProduct.price, unformattedProduct.stock, unformattedProduct.id);
        return await changeProduct(productToSave);
    } catch (error) {
        return `Error changing the product ${error}`
    } 
} 

export default putProduct;