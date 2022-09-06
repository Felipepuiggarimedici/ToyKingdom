import { Router } from "express";
import getProducts from "../../dataModel/productApiServerInterface/getProducts";
import getProduct from "../../dataModel/productApiServerInterface/getProduct";
import setProduct from "../../dataModel/productApiServerInterface/pushProduct";
import Product from "../../dataModel/models/productModel";
import putProduct from "../../dataModel/productApiServerInterface/putProduct";
import attemptDeleteProduct from "../../dataModel/productApiServerInterface/attemptDeleteProduct";

const authenticateAdminCredentials= (): Boolean  => {
    return true;
}

const productsRouter = Router();
productsRouter.get("/", async (_, res) => {
    try {
        const listOfProducts = await getProducts();
        if (typeof listOfProducts === "string") {
            return res.status(500).send(listOfProducts);
        }
        return res.send(listOfProducts);
    } catch(error) {
        return res.status(500).send(error);
    }
})
productsRouter.get("/:id", async(req, res) => {
    try {
        const id : any = req.params.id;
        if (typeof id !== "string") {
            console.log(typeof id)
            return res.status(400).send("Id is not of type string");
        }
        const product : Product | string = await getProduct(id);
        if (typeof product === "string") {
            if (product === "Id does not exist") {
                return res.status(200).send("Product does not exist");
            }
            return res.status(500).send("Product could not be found");
        }
        return res.status(200).send(product);
    } catch(error) {
        return res.status(500).send(error);
    }
})
let changeInProgress = false;
productsRouter.post("/", async(req, res) => {
    const adminRights = authenticateAdminCredentials();
    if (!adminRights) {
        return res.status(500).send("Credentials couldn't be validated");
    }
    if (changeInProgress) {
        return res.status(500).send("Products already being uploaded");
    }
    changeInProgress = true;
    const newProduct = req.body;
    try {
        const postProcessed = await setProduct(newProduct);
        if (postProcessed) {
            res.status(200).send("Product added")
        } else {
            res.status(200).send("Product could not be added")
        }
    } catch(error) {
        res.status(500).send(error);
    } finally {
        changeInProgress = false;
        return 
    }
})
productsRouter.put("/:id", async (req, res) => {
    const adminRights = authenticateAdminCredentials();
    const id : any = req.params.id;
    if (typeof id !== "string") {
        return res.status(400).send("Id is not of type string");
    } else if (!adminRights) {
        return res.status(500).send("Credentials couldn't be validated");
    } else if (changeInProgress) {
        return res.status(500).send("Products already being uploaded");
    }
    changeInProgress = true;
    const newProduct = {...req.body, id: id};
    try {
        const putProcessed = await putProduct(newProduct);
        if (putProcessed === "File couldn't be updated") {
            res.status(500).send("File couldn't be updated");
        } else {
            res.status(200).send(`Product with id ${putProcessed} updated`);
        }
    } catch(error) {
        res.status(500).send(error);
    } finally {
        changeInProgress = false;
        return
    }
})
productsRouter.delete("/:id", async(req, res) => {
    const adminRights = authenticateAdminCredentials();
    const id : any = req.params.id;
    if (typeof id !== "string") {
        console.log(typeof id)
        return res.status(400).send("Id is not of type string");
    } else if (!adminRights) {
        return res.status(500).send("Credentials couldn't be validated");
    } else if (changeInProgress) {
        return res.status(500).send("Products already being uploaded");
    }
    changeInProgress = true;
    try {
        const attemptDeleteProductInfo : string = await attemptDeleteProduct(id);
        res.status(200).send(attemptDeleteProductInfo);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        changeInProgress = false;
        return
    }
})
export default productsRouter;