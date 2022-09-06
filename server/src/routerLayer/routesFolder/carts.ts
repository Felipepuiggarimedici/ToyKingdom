import { Router } from "express";
import attemptCartDeletion from "../../dataModel/cartApiServerInterface/attemptCartDeletion";
import getCart from "../../dataModel/cartApiServerInterface/getCart";
import pushCart from "../../dataModel/cartApiServerInterface/pushCart";

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
        const cartMap: Map<string, number> | string = await getCart(id);
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
export default cartRouter;