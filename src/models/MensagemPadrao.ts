export class DefaultMessage {

    //Mensage to use
    message = [{
        "errorCode": "400",
        "Message": "Erro na requisição, verifique os dados e tente novamente"
    }];


    constructor(codidoErro: string, mensagemToUser: string) {
        this.message = [{
            "errorCode": codidoErro,
            "Message": mensagemToUser
        }]

    };

    //return errors
    erroRetorno() {
        return this.message;
    };
}
