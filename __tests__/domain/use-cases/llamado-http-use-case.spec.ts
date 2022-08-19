import { mock } from 'jest-mock-extended';
import { Llamado_Http } from '../../../src/domain/use-cases/logic/llamado-http';;
import { Llamado_Http_Use_Case } from '../../../src/domain/use-cases/llamado-http-use-case';
import { Registro_Log } from '../../../src/domain/model/registro-log';

describe('Set de pruebas: llamado http caso de uso', () => {
    const mockLlamado = mock<Llamado_Http>();
    const llamadoHttp = new Llamado_Http_Use_Case(mockLlamado);
    it(`dado => una invocacion de llamada http
    cuando => se invoca la peticion
    entonces => se obtiene el objeto de respuesta`, () => {
        const splunk = new Registro_Log();
        const configuracion = {
            method: 'POST',
            headers: {},
            data: {}
        }
        mockLlamado.invocar_peticion(configuracion, splunk);
        llamadoHttp.invocar_peticion(configuracion, splunk);
        expect(mockLlamado.invocar_peticion).toHaveBeenCalledWith(configuracion, splunk);
    })

});