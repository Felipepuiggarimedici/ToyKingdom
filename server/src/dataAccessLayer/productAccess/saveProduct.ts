import FileHandler from "./../fileHandlers/FileHandler";
import path from "path";
import Product from "../../dataModel/models/productModel";
const fh = new FileHandler(path.resolve(__dirname + "/textFiles/products.txt"));

const saveProduct = async (product : Product): Promise<Boolean> => {
    try {
        const saved = await fh.save(product);
        if (!saved) {
            return false;
        }
        return true;
    } catch(error) {
        return false;
    }
}
export default saveProduct;