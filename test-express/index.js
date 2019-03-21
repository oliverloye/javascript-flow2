const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response, next) => {
    console.log("Request was made: " + request.baseUrl);
    next();
})
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/test', (req, res) => res.send('test page.'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));