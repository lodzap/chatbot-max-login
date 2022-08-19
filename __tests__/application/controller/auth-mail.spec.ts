import * as dotenv from "dotenv";
import { Ejecutor_Llamado_Http } from '../../../src/application/controller/ejecutor-llamado-http';
import { Fechas } from '../../../src/application/services/fechas';
import { InformacionRequest } from '../../../src/application/services/informacion-request';
import { AuthMail } from '../../../src/application/controller/auth-mail';
let controllerAuthMail: AuthMail;

describe('Set pruebas: login con AuthMail', () => {
    beforeEach(() => {
        dotenv.config();
        jest.resetAllMocks();
        controllerAuthMail = new AuthMail();
    });

    it(`dado => una solicitud de autenticacion en miEtb
        cuando => se optiene un respuesta
        entonces => se responde el objeto de respuesta`, async () => {
        const mail = '';
        const password = '';
        const token = '';
        const req = '';
        const spyInvocarPeticion = jest.spyOn(Ejecutor_Llamado_Http.prototype, 'invocar_peticion').mockReturnValue(Promise.resolve({}));
        const spyFecha = jest.spyOn(Fechas.prototype, 'getFecha').mockReturnValue('2020-07-08');
        const spyHora = jest.spyOn(Fechas.prototype, 'getHOur').mockReturnValue('16:02');
        const spyRequestIp = jest.spyOn(InformacionRequest.prototype, 'extraerDireccionIp').mockReturnValue('192.168.0.12');
        const spyRequestTel = jest.spyOn(InformacionRequest.prototype, 'extraerNroWhatsapp').mockReturnValue('573195533013');

        const resultado = await controllerAuthMail.authMail(mail, password, token, req);
        expect(resultado).toBeTruthy();
        expect(spyInvocarPeticion).toHaveBeenCalled();
        expect(spyFecha).toHaveBeenCalled();
        expect(spyHora).toHaveBeenCalled();
        expect(spyRequestIp).toHaveBeenCalled();
        expect(spyRequestTel).toHaveBeenCalled();
    })
});