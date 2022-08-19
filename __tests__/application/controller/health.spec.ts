import { Response} from 'express';
import { HealthChecker } from '../../../src/application/controller/health';

const resEnd = {
    end: (() => { })
} as Response;

const resJson = {
    json: (respuesta => resEnd)
} as Response;

const res = {
    status: (number => resJson),
    set: (value => resEnd),
    setHeader: ((value1, value2) => null)
} as Response;

describe('Set de pruebas: manejo de respuestas', () => {

    const checker = new HealthChecker(null, res, null);

    it(`dado => una revision de la salud del servicio
    cuando => la respuesta es exitosa
    entonces => se responde con objeto de respuesta y status ok`, () => {
       const resultado = checker.check();
       expect(resultado).toBeUndefined();
    });

});