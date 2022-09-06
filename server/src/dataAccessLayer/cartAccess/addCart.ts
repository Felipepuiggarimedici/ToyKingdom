import FileHandler from "./../fileHandlers/CartHandler";
import path from "path";
import Cart from "../../dataModel/models/cartModel";
const fh = new FileHandler(path.resolve(__dirname + "/textFiles/cart.txt"));

const saveCart = async (cart: Cart): Promise<string> => {
    try {
        let cartForFile : [[string, number]];
        cart.productList.forEach((value, idKey) => {
            try {
                cartForFile.push([idKey, value]);
            } catch (error) {
                cartForFile = [[idKey, value]];
            }
        })
        const saved : string | null = await fh.save({productList : cartForFile});
        if (saved === null) {
            return "Cart initialization failure";
        }
        return saved;
    } catch(error) {
        return `Error: ${error}`;
    }
}
export default saveCart;