const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');
const server = express();



server.use(cors());
server.use(express.json());
server.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'admin:admin@127.0.0.1:27017/crawler',{
   useNewUrlParser: true
});


server.listen(process.env.PORT || 3000);
