import CartHandler from "./../fileHandlers/CartHandler";
import path from "path";
const fh = new CartHandler(path.resolve(__dirname + "/textFiles/cart.txt"));

const retrieveCart = async (id : string): Promise<{productList?: Array<[string, number]>, id?: string} | string> => {
    try {
        const cart : Object = await fh.getById(id);
        return cart;
    } catch(error) {
        return error;
    }
}
export default retrieveCart;