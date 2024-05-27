import express, { Express, Request, Response } from "express";
const bodyParser = require('body-parser');
require('./connection');
const handler = require('./handler');
const port = process.env.port || 3000;


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req: Request, res: Response, next) {
    res.header("Access-control-Allow-Origin", "*");
    res.header("Access-control-Allow-Methods", "GET, DELETE, POST");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Content-Type");
    next();
});


// Routes
app.get('/allLaunch', handler.allLaunch); // From spacex api
app.post('/addLaunch', handler.addLaunch);
app.get('/getLaunch', handler.getLaunch); // locally saved
app.delete('/rmvLaunch/:id', handler.rmvLaunch);
app.get('/savedIds', handler.savedIds);

app.listen(port, () => console.log(`Server running on ${port}`));