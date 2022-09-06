import Product from "../models/productModel";
import saveProduct from "../../dataAccessLayer/productAccess/saveProduct";

const setProduct = async (product : any): Promise<Boolean> => {
    try {
        if (!product.productName || !product.description || !product.image || !product.price || !product.stock) {
            return false;
        }
        const productToSave = new Product(product.productName, product.description, product.image, product.price, product.stock);
        return await saveProduct(productToSave);
    } catch(error) {
        return false;
    }

}

export default setProduct;