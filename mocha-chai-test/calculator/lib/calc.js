const express = require("express");
const http = require("http");
const PORT = 3001;

/* Basic Calculator API*/
function add(n1, n2) {
    return n1 + n2;
}

function sub(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    if (n1 == 0 || n2 == 0) {
        throw Error("Attempt to divide by ZERO! \n\n" +
            "YOU FOOL! \n");
    } else return n1 / n2;
}

/* End Basic Calculator API*/


/*REST Calculator API*/
function calcServer(port, isStartedCb) {
    const app = express();
    app.get("/api/calc/add/:n1/:n2", (req, res) => {
        const n1 = Number(req.params.n1);
        const n2 = Number(req.params.n2);
        res.send(add(n1, n2).toString());
    })
    app.get("/api/calc/sub/:n1/:n2", (req, res) => {
        const n1 = Number(req.params.n1);
        const n2 = Number(req.params.n2);
        res.send(sub(n1, n2).toString());
    })
    app.get("/api/calc/multi/:n1/:n2", (req, res) => {
        const n1 = Number(req.params.n1);
        const n2 = Number(req.params.n2);
        res.send(multiply(n1, n2).toString());
    })
    app.get("/api/calc/divide/:n1/:n2", (req, res) => {
        const n1 = Number(req.params.n1);
        const n2 = Number(req.params.n2);
        res.send(divide(n1, n2).toString());
    })


    let server = http.createServer(app);


    server.listen(port, () => {
        isStartedCb(server);

    })
}

module.exports = {
    add, sub, multiply, divide, calcServer
}