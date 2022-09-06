import FileHandler from "./../fileHandlers/FileHandler";
import path from "path";
const fh = new FileHandler(path.resolve(__dirname + "/textFiles/products.txt"));

const retrieveIndividualProduct = async (id: string): Promise<any> => {
    try {
        const product = await fh.getById(id);
        return product;
    } catch(error) {
        return error;
    }
}
export default retrieveIndividualProduct;