import deleteCart from "../../dataAccessLayer/cartAccess/deleteCart";

const attemptCartDeletion = async (id: string): Promise<string> => {
    try {
        return await deleteCart(id);
    } catch (error) {
        return error;
    }
}

export default attemptCartDeletion;