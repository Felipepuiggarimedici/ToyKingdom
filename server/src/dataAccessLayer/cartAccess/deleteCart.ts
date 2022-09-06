import CartHandler from "./../fileHandlers/CartHandler";
import path from "path";
const fh = new CartHandler(path.resolve(__dirname + "/textFiles/cart.txt"));

const deleteCart = async (id: string): Promise<string> => {
    try {
        const deleteInformation : Boolean | string = await fh.deleteById(id);
        if (typeof deleteInformation === "string") {
            return deleteInformation;
        } else if (!deleteInformation) {
            return "Cart not found";
        } else {
            return "Cart found";
        }
    } catch (error) {
        return `Error: ${error}`;
    }
}

export default deleteCart;