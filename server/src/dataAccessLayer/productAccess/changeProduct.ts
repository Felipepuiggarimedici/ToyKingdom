import FileHandler from "./../fileHandlers/FileHandler";
import path from "path";
import Product from "../../dataModel/models/productModel";
const fh = new FileHandler(path.resolve(__dirname + "/textFiles/products.txt"));

const changeProduct = async (product : Product): Promise<string> => {
    try {
        const changeInformation : string = await fh.changeProduct(product);
        return changeInformation;
    } catch(error) {
        return error;
    }
}
export default changeProduct;