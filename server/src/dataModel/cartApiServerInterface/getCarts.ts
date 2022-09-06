import retrieveCarts from "../../dataAccessLayer/cartAccess/retrieveCarts";
import Cart from "../models/cartModel"

const getCarts = async ():Promise<Array<Cart> | string> => {
    try {
        const unformattedCarts : Array<any> | string = await retrieveCarts();
        if (typeof unformattedCarts  === "string") {
            return `Carts could not be retrieved. ${unformattedCarts }`;
        }
        const cartList = unformattedCarts.map((cartToFormat) => {
            let productList : Map<string, number> = new Map();
            cartToFormat.productList.forEach((currentProduct : [string, number]) => {
                //adding to the map the id and quantity of each product\
                productList.set(currentProduct[0], currentProduct[1]);
            });
            return new Cart(cartToFormat.id, productList);
        })
        return cartList;
    } catch(error) {
        return `Carts could not be formatted: ${error}`
    }
}
export default getCarts;