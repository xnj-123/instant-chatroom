let express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
let app = express();

let defaultRouter = require('./router');
let APIRouter = require('./router/API')
let urlParser = bodyParser.urlencoded({extended:false});
let jsonParser = bodyParser.json()

app.use(urlParser);
app.use(jsonParser);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',defaultRouter);
app.use('/api',APIRouter)

module.exports = app;