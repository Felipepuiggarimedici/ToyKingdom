import React from "react";
import Item from "./Item";

const ItemList = ({productList}) => {
    return <>
    <div className="listingContainer">
        {productList.map((product) => {
            return <Item key={product.id.toString()} id={product.id} productName={product.title} price={product.price} image={product.image}/>
        })}
    </div>
    </>
}

export default ItemList;