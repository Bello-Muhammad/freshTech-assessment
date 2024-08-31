const express = require('express');
const appRouters = require('./domains');
require('./database/dbConfig');

//express initialization 
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers initialization
app.use(appRouters);

//server intitialization
app.listen(port, () => console.log(`listening on ${port}`));
