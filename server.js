const express = require('express');

const bodyParser = require('body-parser');
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs');
// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require('admin-bro-mongoose'))
const properties = require('./config/properties');
// const db = require('./config/database');
const Users = require('./api/user/user.model')
const News = require('./api/news/news.dao')
//require mongoose module
var mongoose = require('mongoose');

//require chalk module to give colors to console text
var chalk = require('chalk');

//require database URL from properties file
var dbURL = require('./config/properties').DB;

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;
//news routes
const newsRoutes = require('./api/news/news.routes');
let app = express();

//configure bodyparser
let bodyParserJSON = bodyParser.json();
let bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

//initialise express router
let router = express.Router();



// configure app.use()

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Error handling
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
 });

// use express router
app.use('/api',router);
const adminBro = new AdminBro({
   resources: [Users,News],
   rootPath: '/admin',
})
const adminRouter = AdminBroExpressjs.buildRouter(adminBro)
app.use(adminBro.options.rootPath, adminRouter)
//call heros routing
newsRoutes(router);


// intialise server
// call the database connectivity function
const run = async () => {
   await     mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
 }).then(()=>{
     console.log(`connection to database established`)
 }).catch(err=>{
     console.log(`db error ${err.message}`);
     process.exit(-1)
 });

mongoose.connection.on('connected', function(){
    console.log(connected("Mongoose default connection is open to ", dbURL));
});

mongoose.connection.on('error', function(err){
    console.log(error("Mongoose default connection has occured "+err+" error"));
});

mongoose.connection.on('disconnected', function(){
    console.log(disconnected("Mongoose default connection is disconnected"));
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log(termination("Mongoose default connection is disconnected due to application termination"));
        process.exit(0)
    });
   });
   await app.listen(3003, () => console.log(`Example app listening on port 3003!`))
  }
  run()

// app.listen(properties.PORT, () => {
//     console.log(`Server is running on ${properties.PORT} port.`)
// })