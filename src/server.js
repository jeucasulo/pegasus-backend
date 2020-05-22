const path = require('path'); // heroku only

const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

const port = process.env.PORT || 3333; // heroku only
const publicPath = path.join(__dirname, '..', 'public'); // heroku only
app.use(express.static(publicPath)); // heroku only



const server = require('http').Server(app);
// const io = require('socket.io').server();

// app.use((req,res,next)=>{ //middlewa
//   res.header("Access-Control-Allow-Origin", "*");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//
//   return next();
// });

app.use(cors()); // enable outside access
app.use(express.json()); // enable the req.body no reutes.post

// app.use(bodyParser.json());

// app.use(express.urlencoded({
//    extended: true
// }));


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
//

app.use(routes);
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "192.168.0.6:19000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// httpServer.listen(3333);
// server.listen(3333,()=>{
//     console.log('http://localhost:3333/');
// });

app.get('*', (req, res) => { // heroku only
   res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port, () => { // heroku only + optional ouside heroku
   console.log(`Server is up on port ${port}!`);
});
