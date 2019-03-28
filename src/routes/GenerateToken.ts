import { Autentificação } from "../controller/Authentication";


//Route to create tokens
export const GenerateToken = [

    {
        path: "/autentificacao/:email",
        method: "post",
        action: Autentificação
    }
];