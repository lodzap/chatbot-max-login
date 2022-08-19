import * as dotenv from "dotenv";
import { Ejecutor_Llamado_Http } from '../../../src/application/controller/ejecutor-llamado-http';
import { TokenTools } from '../../../src/application/controller/token-tools';
import { InformacionRequest } from '../../../src/application/services/informacion-request';
import { Fechas } from '../../../src/application/services/fechas';
import { Obtener_Token_Registro_Logger } from "../../../src/application/adapters/obtener-token-registro-logger";
let controllerTokenTools: TokenTools;

describe('Set Pruebas: obtener token', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        dotenv.config();
        controllerTokenTools = new TokenTools();
    });

    it(`dado => una solicitud de obtener token
    cuando => se optiene un respuesta
    entonces => se responde el objeto de respuesta`, async () => {
        var req = {tracingId: ''}
        const spyFecha = jest.spyOn(Fechas.prototype, 'getFecha').mockReturnValue('2020-07-08');
        const spyHora = jest.spyOn(Fechas.prototype, 'getHOur').mockReturnValue('16:02');
        const spyRequestIp = jest.spyOn(InformacionRequest.prototype, 'extraerDireccionIp').mockReturnValue('192.168.0.12');
        const spyRequestTel = jest.spyOn(InformacionRequest.prototype, 'extraerNroWhatsapp').mockReturnValue('573195533013');
        const spyInvocarPeticion = jest.spyOn(Ejecutor_Llamado_Http.prototype, 'invocar_peticion').mockReturnValue(Promise.resolve({}));
        const spyLogger = jest.spyOn(Obtener_Token_Registro_Logger.prototype, 'generar_registro').mockReturnValue(null);

        const resultado = await controllerTokenTools.getTokenMail(req);
        expect(resultado).toBeTruthy();
        expect(spyFecha).toHaveBeenCalled();
        expect(spyHora).toHaveBeenCalled();
        expect(spyRequestIp).toHaveBeenCalled();
        expect(spyRequestTel).toHaveBeenCalled();
        expect(spyInvocarPeticion).toHaveBeenCalled();
        expect(spyLogger).toHaveBeenCalled();
    });

});