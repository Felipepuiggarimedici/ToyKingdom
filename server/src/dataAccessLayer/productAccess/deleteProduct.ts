import FileHandler from "./../fileHandlers/FileHandler";
import path from "path";
const fh = new FileHandler(path.resolve(__dirname + "/textFiles/products.txt"));

const deleteProduct = async (id: string): Promise<string> => {
    try {
        const deleteInformation : Boolean | string = await fh.deleteById(id);
        if (typeof deleteInformation === "string") {
            return "Error deleting the product";
        } else if (!deleteInformation) {
            return "Product not found";
        } else {
            return "Product found";
        }
    } catch (error) {
        return `Error: ${error}`;
    }
}

export default deleteProduct;