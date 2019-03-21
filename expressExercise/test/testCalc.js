const expect = require("chai").expect;
const calc = require("../calc.js");
const fetch = require("node-fetch");
const PORT = 3355;
const URL = `http://localhost:${PORT}/api/calc/`;
let server;

describe("Calculator API", function () {


    describe("Test the basic Calculator API", function () {
        it(" Add 4 + 3. Should return 7", function () {
            const result = calc.add(4, 3);
            expect(result).to.be.equal(7);
        })
    })

    describe("testing the REST Calc api", function () {
        before(function (done) {
            calc.calcServer(PORT, function (s) {
                server = s;
                done();
            })
        })

        it("Add 4 + 3 should return 7", async function () {
            const res = await fetch(URL + "add/4/3").then(r => r.text());
            expect(res).to.be.equal('7');
        })
       
        it("Sub 3-2 should return 1", async function (){
            const res = await fetch(URL + "sub/3/2").then(r => r.text())
            expect(res).to.be.equal('1');
        })

        after(function () {
            server.close();
        })
    
    })
})