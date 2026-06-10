let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");
let fileUpload = require("express-fileupload");
let https = require("https");
let http = require("http");
const db = require('./db');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const logger = require('./utils/winstonService');
var cors = require('cors')

const routes = require('./router');
const CONFIG = require('./config/config');
const allowOriginUrl = (CONFIG.NODE_ENV === 'local-development') ? "http://localhost:4200" : "";



var expiryDate = 7 * (24 * 60 * 60 *1000) // days * (hr * min * sec * msec) // 7 days
                 
var store = new MongoDBStore(
    {
      uri: CONFIG.DB.DB_URL,
      collection: 'sessions',
      expires: expiryDate,
      connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000
      }
    },
    function(error) {
      // Should have gotten an error
      console.log('session error : ', error);
});
store.on('error', function(error) {
    // Also get an error here
  });

const cookieSettings = {
    httpOnly: true,
    secure: false,
    maxAge: expiryDate
    //expires: false
    //expires: expiryDate
};

if (CONFIG.NODE_ENV !== "local-development") {
    cookieSettings.secure = true;
    cookieSettings.sameSite = 'none';
}
let app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: false}));
app.use(fileUpload());
const corsOptions = {
  origin: allowOriginUrl, //the port my react app is running on.
  credentials: true,
  methods:['GET','POST','PUT','DELETE']
}
app.use(cors(corsOptions));
app.use('/api', routes);

http.createServer(app).listen(CONFIG.PORT.HTTP);
app.use(function (req, res, next) {
  // Website you wish to allow to connect

  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Credentials", "true")
  // Request methods you wish to allow
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  )


  // Request headers you wish to allow
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization,X-Requested-With,content-type"

  );
  //res.header('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});




let server = app.listen(CONFIG.PORT.EXPRESS, function () {
    logger(2, "Express server listening on port " + CONFIG.PORT.EXPRESS);
    db.connection.on('open', async () => {
    })
});
var io = require('socket.io')(server);


io.on('connect',function (socket) {
    console.log(socket.id);
    socket.emit('test event', 'some data');
    
    socket.on('message',function(data){
        console.log('A client sent us this dumb message:', data);
        socket.emit('resMessage',{message:'message recevied'});
    });
});
app.get("*", (req, res) => {
    res.send({status: 404, message: 'The specified url does not exists'});
});