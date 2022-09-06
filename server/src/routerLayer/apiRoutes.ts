import { Router } from "express";
import productsRouter from "./routesFolder/products";
import cartRouter from "./routesFolder/carts";

const generalRouter = Router();
generalRouter.use("/products", productsRouter);
generalRouter.use("/cart", cartRouter);
export default generalRouter;