const moment = require('moment-timezone');
moment.locale('es');
import * as dotenv from "dotenv";
import { Fechas } from '../../../src/application/services/fechas';


describe('Set pruebas: servicios de authMail', () => {
    let servicio: Fechas;
    beforeEach(() => {
        dotenv.config();
        jest.resetAllMocks();
        servicio = new Fechas();
    });

    it(`dado => una solicitud de autenticacion en miEtb
        cuando => se manda mensaje a parly
        entonces => se responde el objeto de respuesta de fecha dinamica`, async () => {
        const req = servicio.getFecha();;
        expect(req).toStrictEqual(moment().tz('America/Bogota').format('YYYY-MM-DD'));
    })

    it(`dado => una solicitud de autenticacion en miEtb
    cuando => se manda mensaje a parly
    entonces => se responde el objeto de respuesta con hora dinamica`, async () => {
        const req = servicio.getHOur();;
        expect(req).toStrictEqual(moment().tz('America/Bogota').format('HH:mm'));
    })
});