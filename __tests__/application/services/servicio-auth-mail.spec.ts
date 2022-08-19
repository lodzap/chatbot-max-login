import { AuthMail } from "../../../src/application/controller/auth-mail";
import { NextFunction } from "express";
import { Configuraciones } from "../../../src/application/controller/configuraciones";
import { SecurityTools } from "../../../src/presentation/util/security-tools";
import { TokenTools } from "../../../src/application/controller/token-tools";
import { ServiceAuthMail } from "../../../src/application/services/servicio-auth-mail";

describe('Set pruebas: servicios de authMail', () => {
    let servicio: ServiceAuthMail;

    beforeEach(() => {
        servicio = new ServiceAuthMail();
        jest.clearAllMocks();
    });


    it(`dado => una solicitud de autenticación e mi ETB
    cuando => el login es valido
    entonces => el sistema debe retornar el stado de la autenticación`,
        async () => {
            const req = {
                body: {
                    "mail": "",
                    "password": "",
                    "idConversacion": ""
                }
            };
            const res = { data: {} };
            const result = { data: {} };
            const password = "";
            const sendKey = "";
            const responseToken = { data: { respuesta: { WSResponseBody: { SecurityToken: "" } } } };
            spyOn(SecurityTools.prototype, 'encrypt3DES');
            const resToken = jest.spyOn(TokenTools.prototype, 'getTokenMail').mockReturnValue(Promise.resolve(responseToken));
            const authMail = jest.spyOn(AuthMail.prototype, 'authMail').mockReturnValue(Promise.resolve(res));
            const resAuthMail = await servicio.authMail(req, res, () => { });
            // expect(resAuthMail).toBe(result);

        });

});