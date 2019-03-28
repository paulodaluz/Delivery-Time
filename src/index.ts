import {createConnection} from "typeorm";
import * as express from "express";


createConnection().then(async connection => {
    
    const app = express();
    
    app.use("/test",(req, res) =>{
        res.send("test")
    })

    app.listen(3000);
    
    console.log();
    console.log("Express API is working on port 3000");

}).catch(error => console.log("TypeORM connection error: ", error));
