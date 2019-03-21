const calc = require("./calculator/lib/calc.js");
const PORT = 4455;

calc.calcServer(PORT, () => {console.log(`Server started, listening on: ${PORT}`)});