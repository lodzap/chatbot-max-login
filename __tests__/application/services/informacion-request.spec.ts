import { InformacionRequest } from "../../../src/application/services/informacion-request";
import request from 'request';

describe('Set pruebas: servicios de authMail', () => {
    let servicio: InformacionRequest;

    beforeEach(() => {
        servicio = new InformacionRequest();
        jest.clearAllMocks();
    });


    it(`dado => una solicitud de autenticación e mi ETB
    cuando => el login es valido
    entonces => el sistema debe retornar el stado de la autenticación`,
        async () => {
            var req = { connection: { remoteAddress: "192.168.0.12" } }
            const dirIP = servicio.extraerDireccionIp(req)
            expect(dirIP).toStrictEqual(req.connection.remoteAddress);
        });


    it(`dado => una solicitud de autenticación e mi ETB
        cuando => el login es valido
        entonces => el sistema debe retornar el stado de la autenticación`,
        async () => {
            var req = { body: { idConversacion: "573195533013" } }
            const dirIP = servicio.extraerNroWhatsapp(req)
            expect(dirIP).toEqual("573195533013");
        });

    it(`dado => una solicitud de extraer direccion ip
        cuando => el login no es valido
        entonces => el sistema debe retornar la ip vacia`,
        async () => {
            var req = { connection: {} }
            const dirIP = servicio.extraerDireccionIp(req)
            expect(dirIP).toEqual('');
        });

});