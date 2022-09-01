const express = require("express");
const { Router } = express;
const routerIndividualProduct = Router();

const FileHandler = require("../../fileHandlers/FileHandler.js");

const fileHandler = new FileHandler("./fileHandlers/products.txt");

routerIndividualProduct.get("/:id", async(req, res, next) => {
    const id = parseInt(req.params.id);
    const product = await fileHandler.getById(id);
    if (product !== null) {
        res.locals.exist = true;
    }
    res.locals.product = product;
    next();
})
routerIndividualProduct.put("/addProduct/:id", async(req, res) => {
    try {
        const product = {id: parseInt(req.params.id), ...req.body};
        const changeProductResponse = await fileHandler.changeProduct(product);
        if (changeProductResponse === "ID, price and name should be of type integer and should be specified") {
            const error = new Error(changeProductResponse);
            error.httpStatusCode = 400;
            return res.status(404).send(`Error ${error.httpStatusCode}: ${error.message}`);
        } else if (changeProductResponse === "File couldn't be updated") {
            const error = new Error(changeProductResponse);
            error.httpStatusCode = 500;
            return res.status(500).send(`Error ${error.httpStatusCode}: ${error.message}`);
        } else if (changeProductResponse === null) {
            const error = new Error("Product already in the file");
            error.httpStatusCode = 400;
            return res.status(400).send(`Error ${error.httpStatusCode}: ${error.message}`);
        } else {
            return res.send(`File updated correctly and product inserted with id: ${changeProductResponse}`)
        }
    } catch (error) {
        const errorAssign = new Error("Product was not entered correctly or File entered incorrectly");
        errorAssign.httpStatusCode = 400;
        return res.status(400).send(`Error ${errorAssign.httpStatusCode}: ${errorAssign.message}`);
    }
})
routerIndividualProduct.delete("/:id", async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            const error = new Error("ID invalid");
            error.httpStatusCode = 400;
            return res.status(400).send(`Error ${error.httpStatusCode}: ${error.message}`);
        }
        const idExists = await fileHandler.deleteById(id);
        if (!idExists) {
            return res.send("Product was not found");
        }
        else {
            return res.send("Product eliminated")
        }
    } catch (error) {
        const errorAssign = new Error("File was not entered correctly");
        errorAssign.httpStatusCode = 400;
        return res.status(400).send(`Error ${errorAssign.httpStatusCode}: ${errorAssign.message}`);
    }
})
module.exports = routerIndividualProduct;