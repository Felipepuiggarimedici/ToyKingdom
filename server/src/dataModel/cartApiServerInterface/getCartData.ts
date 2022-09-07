import retrieveCart from "../../dataAccessLayer/CartAccess/retrieveCart";

const getCartData = async (id : string):Promise<Map<string, number> | string> => {
    try {
        const unformattedCart = await retrieveCart(id);
        if (typeof unformattedCart === "string") {
            if (unformattedCart === "Id does not exist") {
                return "Id does not exist";
            }
            return `Cart could not be retrieved. ${unformattedCart}`;
        }
        const productList : Map<string, number> = new Map();
        if (!unformattedCart.productList) {
            return "Empty cart";
        }
        unformattedCart.productList.forEach((product) => {
            productList.set(product[0], product[1]);
        })
        return productList;
    } catch(error) {
        return `Cart could not be formatted: ${error}`
    }
}
export default getCartData;