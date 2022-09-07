import CartHandler from "./../fileHandlers/CartHandler";
import path from "path";
import Cart from "../../dataModel/models/cartModel";
const fh = new CartHandler(path.resolve(__dirname + "/textFiles/cart.txt"));

const replaceCart = async (cart : Cart): Promise<string> => {
    try {
        let productListArray: Array<[string, number]>; 
        cart.productList.forEach((quantity, id) => {
            try {
                productListArray.push([id, quantity]);
            } catch (error) {
                productListArray = [[id, quantity]];
            }
        })
        const changeInformation : string = await fh.changeCart(cart.id, productListArray);
        return changeInformation;
    } catch(error) {
        return error;
    }
}
export default replaceCart;