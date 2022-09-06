import express from 'express';
import http from 'http';
import router from "./routerLayer/apiRoutes";

const app = () => {
    const app = express();

    app.use(express.json());
    //set up the general api routers for api requests
    app.use("/api", router);

    //Routes that are non existent return 404 error
    app.get('*', (_, res) => res.status(404).send('Invalid route'));

    //creating event listener -> "listening" on app.
    const server = http.createServer(app);

    server.on('listening', () => {
        console.info(`Server online. Listening on Port: ${process.env.PORT}...`);

    });
    return server;
}
export default app;