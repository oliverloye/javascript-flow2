const express = require("express");
const http = require("http");
let app = express();
const PORT = 3000;
//Add your code here

//Custom middleware
app.use("/*", function (req, res, next) {
    console.log('Time:', Date.now()+"Log all requests");
    next();
});

app.get("/api/calculator/:operation/:n1/:n2", function(req,res,next){
    let calculatorRequest = {
        operation: req.params.operation,
        n1: Number(req.params.n1),
        n2: Number(req.params.n2)
    }
    let calcResult;

    if(calculatorRequest.operation === "add") {
        calcResult = calculatorRequest.n1 + calculatorRequest.n2;
    }
    if(calculatorRequest.operation === "sub") {
        calcResult = calculatorRequest.n1 - calculatorRequest.n2;
    }
    if(calculatorRequest.operation === "mul") {
        calcResult = calculatorRequest.n1 * calculatorRequest.n2;
    }
    if(calculatorRequest.operation === "power") {
        calcResult = calculatorRequest.n1 ** calculatorRequest.n2;
    }
    if(calculatorRequest.operation === "div") {
        if(calculatorRequest.n1 == 0 || calculatorRequest.n2 == 0) {
            throw new Error("Attempt to divide by zero");
        } else {
            calcResult = calculatorRequest.n1 / calculatorRequest.n2;
        }
    }

    calculatorRequest.result = calcResult;
    res.json(calculatorRequest);

});

app.get("/", (req, res, next) => {
    console.log("Request was made " + req.baseUrl);
    next();
});

// app.get('/api/calculator/add/:n1/:n2', function(req, res) {
//     var calculatorRequest = {
//         operation: "add",
//         n1: Number(req.params.n1),
//         n2: Number(req.params.n2),
//     }
//     let addResult;
//
//     addResult = calculatorRequest.n1 + calculatorRequest.n2;
//     calculatorRequest.result = addResult;
//     res.json(calculatorRequest);
//
// })
//
// app.get('/api/calculator/sub/:n1/:n2', function(req, res) {
//     let addResult;
//     let addNumber1 = Number(req.params.n1);
//     let addNumber2 = Number(req.params.n2);
//
//     addResult = addNumber1 - addNumber2;
//     res.send(addResult.toString());
//
// })
//
// app.get('/api/calculator/mul/:n1/:n2', function(req, res) {
//     let addResult;
//     let addNumber1 = Number(req.params.n1);
//     let addNumber2 = Number(req.params.n2);
//
//     addResult = addNumber1 * addNumber2;
//     res.send(addResult.toString());
//
// })
//
// app.get('/api/calculator/divide/:n1/:n2', function(req, res) {
//     let addResult;
//     let addNumber1 = Number(req.params.n1);
//     let addNumber2 = Number(req.params.n2);
//
//     addResult = addNumber1 / addNumber2;
//     res.send(addResult.toString());
//
// })


app.listen(PORT,()=> {console.log(`Server started, listening on: ${PORT}`)});