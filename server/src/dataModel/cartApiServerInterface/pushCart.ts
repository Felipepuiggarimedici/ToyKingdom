import saveCart from "../../dataAccessLayer/cartAccess/addCart";
import Cart from "../models/cartModel";

const addCart = async( unformattedCart: any ): Promise<string> => {
    const cart = new Cart();
    let incorrectFormat : string = "";
    if (unformattedCart) {
        unformattedCart.forEach((product : any) => {
            if (!product.quantity || !product.id) return;
            else {
                if (typeof product.quantity !== "number" || typeof product.id !== "string") {
                    incorrectFormat = "The format of the product quantities or id is not of the correct type";
                    return;
                }
                for (let i = 0; i < product.quantity; i++) {
                    cart.addProduct(product.id);
                }
            }
        })
    }
    if (incorrectFormat) return incorrectFormat;
    const savedInformation = await saveCart(cart)
    return savedInformation;
}
export default addCart;