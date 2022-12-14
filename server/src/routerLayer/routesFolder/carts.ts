import { Router } from "express";
import attemptCartDeletion from "../../dataModel/cartApiServerInterface/attemptCartDeletion";
import addToCart from "../../dataModel/cartApiServerInterface/addToCart";
import getCartData from "../../dataModel/cartApiServerInterface/getCartData";
import pushCart from "../../dataModel/cartApiServerInterface/pushCart";
import removeFromCart from "../../dataModel/cartApiServerInterface/removeFromCart";

const cartRouter = Router();
cartRouter.post("/", async (req, res) => {
    const newCart = req.body;
    try {
        const postCart = await pushCart(newCart);
        return res.status(200).send(postCart)
    } catch(error) {
        return res.status(500).send(error);
    } 
})
cartRouter.delete("/:id", async (req, res) => {
    const id : any = req.params.id;
    if (typeof id !== "string") {
        return res.status(400).send("Id is not of type string");
    }
    try {
        const cartDeleteInfo = await attemptCartDeletion(id);
        if (cartDeleteInfo === "Cart found" || cartDeleteInfo === "Cart not found") {
            return res.status(200).send(cartDeleteInfo);
        }
        else {
            return res.status(500).send(cartDeleteInfo);
        }
    } catch (error) {
        return res.status(500).send(error);
    }
})
cartRouter.get("/:id/products", async (req, res) => {
    const id : any = req.params.id;
    if (typeof id !== "string") {
        return res.status(400).send("Id is not of type string");
    }
    try {
        const cartMap: Map<string, number> | string = await getCartData(id);
        if (cartMap === "Empty Cart" || cartMap === "Id does not exist") {
            return res.status(200).send("Empty Cart");
        } else if (typeof cartMap === "string") {
            return res.status(500).send("Couldn't find cart");
        } else {
            console.log(cartMap)
            return res.status(200).send(cartMap);
        }
    } catch (error) {
        return res.status(500).send(`Error: ${error}`)
    }    
})
cartRouter.post("/:id/products", async (req, res) => {
    const cartId : any = req.params.id;
    const productIds : any = req.body;
    if (typeof cartId !== "string" || !Array.isArray(productIds)) {
        return res.status(400).send("Cart id should be of type string and product ids should be the only parameter in the body and should be of type array");
    }
    try {
        await addToCart(cartId, productIds);
        return res.send(`Success. Products added to cart`)
    } catch (error) {
        return res.send(500).send(`Error: ${error}`)
    }
})
cartRouter.delete("/:id/products/:idProduct", async (req, res) => {
    const cartId : any = req.params.id;
    const productId : any = req.params.idProduct;
    if (typeof cartId !== "string" || typeof productId !== "string" ) {
        return res.status(400).send("Cart id should be of type string and product ids should be the only parameter in the body and should be of type array");
    }
    try {
        await removeFromCart(cartId, productId);
        return res.send(`Success. Products removed from cart`)
    } catch (error) {
        return res.send(500).send(`Error: ${error}`)
    }
})
export default cartRouter;