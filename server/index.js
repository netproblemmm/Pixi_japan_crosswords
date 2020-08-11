const http = require("http");
const express = require("express");

const app = express();

app.use("/api", express.json());

app.get("/api", (req, res) =>{
    res.send({
        VERSION:10
    })
});

app.use("/", express.static(__dirname + "/../dist"));

const server = http.createServer(app);
server.listen(2345, "0.0.0.0", ()=>{
    console.log("Server started on:", 2345);
})