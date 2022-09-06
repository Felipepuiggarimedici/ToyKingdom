import CartHandler from "./../fileHandlers/CartHandler";
import path from "path";
const fh = new CartHandler(path.resolve(__dirname + "/textFiles/cart.txt"));

const retrieveCarts = async (): Promise<Array<Object> | string> => {
    try {
        const cartList : Array<Object> = await fh.getAll();
        return cartList;
    } catch(error) {
        return error;
    }
}
export default retrieveCarts;