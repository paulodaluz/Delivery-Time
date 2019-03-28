import { Request, Response } from "express";
import { } from "express-validator";
var Correios = require('node-correios'), correios = new Correios();
import * as bodyParser from "body-parser";


const d = require("../config/ShippingLocation").DepartureLocation;

export async function teste(request: Request, response: Response) {
    console.log("oi")
    var args = {
        nCdEmpresa: d.nCdEmpresa,
        nDsSenha: d.nDsSenha,
        nCdServico: '40010,41106,40215',
        sCepOrigem: d.sCepOrigem,
        sCepDestino: request.body.request.address.postalCode,
        nVlPeso: request.body.request.order.items.weight,
        nCdFormato: request.body.request.order.items.taxCode,
        nVlComprimento: request.body.request.order.items.length,
        nVlAltura: request.body.request.order.items.height,
        nVlLargura: request.body.request.order.items.width,
        nVlDiametro: "0",
        sCdMaoPropria: d.sCdMaoPropria,
        nVlValorDeclarado: request.body.request.order.rawTotalPrice,
        sCdAvisoRecebimento: d.sCdAvisoRecebimento

    }

    correios.calcPrecoPrazo(args, function (err, result) {
        console.log(result);
        console.log(err);
    });

}
