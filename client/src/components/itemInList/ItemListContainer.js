import React, { useEffect, useState } from "react";
import Loading from "../generalComponents/Loading";
import ItemList from "./ItemList";

const ItemListContainer = () => {
    const [loading, setLoading] = useState(true);
    let [productList, setProductList] = useState([]);

    const getProducts = async() => {
        let response = await fetch("/api/products", {
            method: "GET"
        })
        response = await response.json();
        setProductList(response.products);
        setLoading(false);
    }
    useEffect(() => {
        getProducts();
        // eslint-disable-next-line
    }, [])
    return <>
        {loading ? <Loading/>:<ItemList productList={productList}/>}
    </>
}

export default ItemListContainer;