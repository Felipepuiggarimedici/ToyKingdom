import React from "react";

const Item = ({id, productName, price, image}) => {
    return <>
        <div className="productCard">
            <h2>{productName}</h2>
            <p>{price}</p>
            <img alt={`${productName}`} src={`${image}`}/>
        </div>
    </>
}

export default Item;