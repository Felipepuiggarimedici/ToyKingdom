import React, { useState } from "react";

const FormPart = ({sendUpdate}) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");

    const updateTitle = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }
    const updatePrice = (e) => {
        e.preventDefault();
        setPrice(e.target.value);
    }
    const updateImage = (e) => {
        e.preventDefault();
        setImage(e.target.value);
    }
    const addProduct = (e) => {
        e.preventDefault();
        const productToAdd = {title: title, price: price, image: image}
        sendUpdate(productToAdd)
    }
    return <>
        <form onSubmit={addProduct}>
            <div class="form-group">
                <label for="titleOfProduct">Title of product</label>
                <input name="title" onChange={updateTitle} type="text" class="form-control" id="titleOfProduct" aria-describedby="emailHelp" placeholder="Enter title of product"/>
            </div>
            <div class="form-group">
                <label for="imageOfProduct">Enter image url</label>
                <input name="image" onChange={updateImage} type="text" class="form-control" id="imageOfProduct" aria-describedby="emailHelp" placeholder="Enter url"/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Price of product</label>
                <input name="price" onChange={updatePrice} type="number" class="form-control" id="exampleInputPassword1" placeholder="$700"/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </>
}

export default FormPart;