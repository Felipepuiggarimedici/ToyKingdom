const express = require("express");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const routerProducts = require("./routersForApi/routerProducts");

const { Server } = require("socket.io");
const http = require("http");
const serverHttp = http.createServer(app);
const io = new Server(serverHttp);
const messages = [{author: "server", text:"These messages are not encrypted"}]
const MessageHandler = require("../chatToDelete/MessageHandler.js");
const messageHandler = new MessageHandler("./chatToDelete/messages.txt")
const FileHandler = require("../fileHandlers/FileHandler.js");
const fileHandler = new FileHandler("./fileHandlers/products.txt");
io.on("connection" , async(socket) => {
    console.log("Client connected");
    socket.emit("message", messages);
    let productList = await fileHandler.getAll();
    let messageList = await messageHandler.getAll();
    socket.emit("productRender", productList);
    socket.emit("receiveMessages", messageList);
    socket.on("update", async(data) => {
        console.log("update")
        await fileHandler.save(data);
        productList = await fileHandler.getAll();
        io.sockets.emit("productRender", productList);
    })
    socket.on("newMessage", async(data) => {
        console.log("new message");
        await messageHandler.save(data);
        messageList = await messageHandler.getAll();
        io.sockets.emit("receiveMessages", messageList);
    })
})

app.get("/", (req, res) => {
    res.res(`Server online`);
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routerProducts);

app.get("/api/products/:id", (req, res) => {
    return res.res({product: res.locals.product, exists: res.locals.exist})
})
app.get("/api/products", (req, res) => {
    return res.json({products : res.locals.products})
})
app.get("/api/addProduct", (req, res) => {
    return res.render("form")
})
serverHttp.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})