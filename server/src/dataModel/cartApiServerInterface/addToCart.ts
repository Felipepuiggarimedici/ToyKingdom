import replaceCart from "../../dataAccessLayer/cartAccess/replaceCart";
import Cart from "../models/cartModel";
import getCartData from "./getCartData";

const addToCart = async (cartId: string, productIds : Array<string>): Promise<string> => {
    const cartData : string | Map<string, number> = await getCartData(cartId);
    let newCart : Cart;
    if (typeof cartData === "string") {
        newCart = new Cart(cartId)
    }
    else {
        newCart = new Cart(cartId, cartData)
    }
    productIds.forEach((id) => {
        newCart.addProduct(id);
    })
    return await replaceCart(newCart);
}
export default addToCart;