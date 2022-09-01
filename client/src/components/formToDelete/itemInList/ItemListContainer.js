import React, { useEffect, useState } from "react";
import Loading from "../../generalComponents/Loading";
import ItemList from "./ItemList";
import io from 'socket.io-client';
import FormPart from "../FormPart";
const socket = io();

const ItemListContainer = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const updateEmail = (e) => {
        setNewEmail(e.target.value);
    }
    const updateMessage = (e) => {
        setNewMessage(e.target.value);
    }
    let [productList, setProductList] = useState([]);
    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
          });
        socket.on("update", data => {
            setProductList(data);
        })
        socket.on("productRender",async(data) => {
            setProductList(await data)
        })
        socket.on("receiveMessages", async(data) => {
            setMessages(await data)
        })
    }, [])
    const sendUpdate = (newProduct) => {
        socket.emit("update", newProduct);
    }
    const submitMessage = (e) => {
        e.preventDefault();
        socket.emit("newMessage", {email: newEmail, message: newMessage})
    }
    return <>
        <FormPart sendUpdate={sendUpdate}/>
        {isConnected ? <ItemList productList={productList} sendUpdate={sendUpdate} /> :<Loading/>}
        {isConnected ? <div>
            {messages.map((message) => {
                return <div>
                    <h1>{message.email}:</h1>
                    <p>{message.message}</p>
                </div>
            })}
        </div> :<Loading/>}
        <form onSubmit={submitMessage}>
            <label for="email">Email</label>
            <input onChange={updateEmail} type="email" name="email" placeholder="email@gmail.com"/>
            <label for="message">Message</label>
            <input onChange={updateMessage} type="text" name="message" placeholder="text message"/>
            <button type="submit" class="btn btn-primary">Submit</button>   
        </form>
    </>
}

export default ItemListContainer;