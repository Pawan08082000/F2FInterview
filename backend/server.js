const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors =  require('cors');
const InitiateMongoServer = require('./config/db.config');
InitiateMongoServer();
const options = {
    origin: '*',
 }
app.use(cors(options));

const router = require('./router');

app.use(bodyParser.json());
app.use('/api', router)


app.get('/', (req, res)=>{
    res.status(200).json({message: 'Server is Up!'});
})

const server = app.listen(9000, ()=>{
    port = server.address().port;
    console.log('server is created on: ',port);
});