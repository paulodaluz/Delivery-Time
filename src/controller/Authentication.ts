import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");


export async function Autentificação(request: Request, response: Response) {

    const token = jwt.sign({ email: request.params.email }, authConfig.secret, 
    );

    response.send({token});
}