const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const routes = require('./controller');

app.use(bodyParser.json());

app.use('/yak-shop',routes);

app.listen(3000,()=>{
    console.log('app running');
});
