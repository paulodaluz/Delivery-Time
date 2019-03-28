import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import { Request, Response } from "express";
import { AppRoutesPostmen } from "./routes/PostOfficesRoutes";
import { GenerateToken } from "./routes/GenerateToken";
import * as bodyParser from "body-parser";
const authMiddleware = require("./middlewares/auth");


createConnection().then(async connection => {
    //Importing express function
    const app = express();

    //Register all connections from AppRoutesPostmen using a forEach
    AppRoutesPostmen.forEach(route => {
        app[route.method](route.path, authMiddleware, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });
    
   //Register all connections from GenerateToken using a forEach
   GenerateToken.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    //Port where the application is running
    app.listen(3002);
    
    console.log();
    console.log("Express API is working on port 3002");

    //Tell the user that the page does not exist when it enters a page that does not exist
    app.use((req, res) => {
        res.status(404).json({ errorCode: 404, msg: 'Page Not Found!' });
    });

}).catch(error => console.log("TypeORM connection error: ", error));
