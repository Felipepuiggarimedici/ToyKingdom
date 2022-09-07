import replaceCart from "../../dataAccessLayer/cartAccess/replaceCart";
import Cart from "../models/cartModel";
import getCartData from "./getCartData";

const removeFromCart = async (cartId: string, productId : string): Promise<string> => {
    const cartData : string | Map<string, number> = await getCartData(cartId);
    let newCart : Cart;
    if (typeof cartData === "string") {
        newCart = new Cart(cartId)
    }
    else {
        newCart = new Cart(cartId, cartData)
    }
    newCart.deleteProduct(productId);
    return await replaceCart(newCart);
}
export default removeFromCart;