import http from "http";
import express from "express";
import SocketIO from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log("Listening on 'http://localhost:3000'");

const httpServer = http.createServer(app);
const ioServer = SocketIO(httpServer);

ioServer.on("connection", (socket) => {
  socket.on("enter_room", (msg) => {
    console.log(msg);
  });
});

httpServer.listen(3000, handleListen);
