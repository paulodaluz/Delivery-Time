import { Request } from "express";
import { } from "express-validator";


export class validation {

    validaInformacoes(request: Request) {
    //Date validation
    request.assert("request.order.items", "Items is required.").notEmpty();
    request.assert("request.address.postalCode", "Postal code is required and it need have eight characters.").notEmpty().isLength({ min: 8, max: 8 });
    request.assert("request.order.items[0].product.taxCode", "TaxCode is required.").notEmpty()
    request.assert("request.order.orderTotal", "Order total is required").notEmpty()


    var items = request.body.request.order.items

    for (var i = 0; i < items.length; i++) {
        request.assert(`request.order.items[${i}].product.length`, `Product ${i + 1}: Length is Invalid, The length should include a package and must be in centimeters`).notEmpty();
        request.assert(`request.order.items[${i}].product.width`, `Product ${i + 1}: Width Invalid, Width should include a package and needs to be in centimeters`).notEmpty();
        request.assert(`request.order.items[${i}].product.weight`, `Product ${i + 1}: Weight Invalid, The weight shall be reported in kilograms and the maximum permissible value shall be 1 kg.`).notEmpty();
        request.assert(`request.order.items[${i}].product.height`, `Product ${i + 1}: Height Invalid, The height should include the packaging and need to be in centimeters`).notEmpty();
    }
        var error = request.validationErrors();

        if (error) {
            var mistakes = []
            error.forEach(elemento => {
                mistakes.push(elemento.msg)
            })
            return mistakes;
        }
        return null;
    }
}