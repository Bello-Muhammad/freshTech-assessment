const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI;
// mongoose setup
mongoose.set('strictQuery', false);
mongoose.connect( DB_URI, {
}).then((res) => {
    console.log(`connected to database on: ${DB_URI}`);
});
