import { Request, Response } from "express";
import { } from "express-validator";
var Correios = require('node-correios'), correios = new Correios();
import * as bodyParser from "body-parser";
var axios = require("axios");

var url = require("../config/ShippingLocation").url

const d = require("../config/ShippingLocation").DepartureLocation;



export async function teste(request: Request, response: Response) {
    var items = request.body.request.order.items
    var length = 0
    var width = 0;
    var weight = 0;
    var height = 0;
    var totalPrice = request.body.request.order.orderTotal;
    
    for (var i = 0; i < items.length; i++) {
        length += parseInt(request.body.request.order.items[i].product.length)
        width += parseInt(request.body.request.order.items[i].product.width)
        weight += parseFloat(request.body.request.order.items[i].product.weight)
        height += parseInt(request.body.request.order.items[i].product.height)
    
    }

    var x = url + `nCdServico=${d.nCdServico}&sCepOrigem=${d.sCepOrigem}&sCepDestino=${request.body.request.address.postalCode}&nVlPeso=${weight}&nCdFormato=${request.body.request.order.items[0].product.taxCode}&nVlComprimento=${length}&nVlAltura=${height}&nVlLargura=${width}&nVlDiametro=${25}&nVlValorDeclarado=${totalPrice}`
    
    var responseToUser = await axios.get(x, {})
    .then(response => {
        return (response.data.response)
    })
    .catch(error => {
        console.log(error)
    })
    response.send(responseToUser)
}