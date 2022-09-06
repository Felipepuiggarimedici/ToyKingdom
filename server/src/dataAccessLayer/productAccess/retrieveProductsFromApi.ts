import FileHandler from "./../fileHandlers/FileHandler";
import path from "path";
const fh = new FileHandler(path.resolve(__dirname + "/textFiles/products.txt"));

const retrieveProducts = async (): Promise<Array<Object> | string> => {
    try {
        const productList : Array<Object> = await fh.getAll();
        return productList;
    } catch(error) {
        return error;
    }
}
export default retrieveProducts;