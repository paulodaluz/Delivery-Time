import { Autentificação } from "../controller/Authentication";


export const GenerateToken = [

    {
        path: "/autentificacao/:email",
        method: "post",
        action: Autentificação
    }
];