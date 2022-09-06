import deleteProduct from "../../dataAccessLayer/productAccess/deleteProduct";

const attemptDeleteProduct = async (id: string): Promise<string> => {
    try {
        return await deleteProduct(id);
    } catch (error) {
        return error;
    }
}

export default attemptDeleteProduct;