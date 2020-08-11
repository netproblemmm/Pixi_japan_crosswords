const http = require("http");
const express = require("express");
const uuid = require("uuid");
const md5 = require("md5");
const fs = require("fs");

const api_secret = "JGq1f5sUtxvt3Kc6eqid";
const app = express();

app.use("/api", express.json());

class User {
    constructor(options) {
        const {token, viewer_id} = options || {};
        this.token = token || uuid();
        this.viewer_id = viewer_id || 0;
    }
}

function getUser(req) {
    const {viewer_id, api_id, auth_key} = req.query;
    const check_auth_key = md5(api_id + '_' + viewer_id + '_' + api_secret);

    if (auth_key !== check_auth_key) {
        return false;
    }
    return new User({viewer_id});
}

app.get("/api", (req, res) =>{
    res.send({
        VERSION:10
    })
});

function uglyTemplate(req, res) {
    const usr = getUser(req);
    if (!usr) {
        res.send(403);
        return;
    }

    const jsCode = `
    window.config = {
        token: '${usr.token}',
    };
    `;

    fs.readFile(__dirname + '/../dist/index.html', 'utf8', (err, data) => {
        const result = data.replace('/* AUTH */', jsCode)
            .replace('<script></script>', `<script>${jsCode}</script>`);
        res.send(result);
    });
}

app.get("/", uglyTemplate);
app.get("/index.html", uglyTemplate);

app.use("/", express.static(__dirname + "/../dist"));

const server = http.createServer(app);
server.listen(2345, "0.0.0.0", ()=>{
    console.log("Server started on:", 2345);
})

// https://lecars.ru/?
// api_id=7562369
// viewer_id=142373751
// auth_key=81bf4729f4b7b095807f5eb053855b30