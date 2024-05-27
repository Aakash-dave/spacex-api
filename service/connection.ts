//connection
const mongoose = require('mongoose');
const connectionQRL = "mongodb://127.0.0.1:27017/spacexdb";

try {
    mongoose.connect(connectionQRL);
    console.log('Connection successful!');
}
catch (err: unknown) {
    console.log('Connection failed');
}