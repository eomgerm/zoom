import http from "http";
import express from "express";
import ServerIO from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const httpServer = http.createServer(app);
const ioServer = ServerIO(httpServer);

const handleListen = () => console.log("Listening on 'http://localhost:3000'");
httpServer.listen(3000, handleListen);