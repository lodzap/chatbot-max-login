import { Logger_Splunk } from '../../../src/application/services/logger-splunk';
import Log from '../../../src/incubating/packages/Log';
import { Tipo_Peticion } from "../../../src/domain/model/tipo-peticion";
import { Registro_Log } from "../../../src/domain/model/registro-log";
describe('Test LoggerSplunk', () => {

    describe('Set de pruebas: logger Splunk ', () => {

        const loggerSplunk = new Logger_Splunk();
        let spy: any;
        let splunk: Registro_Log;
        let tipoPeticion: Tipo_Peticion;
        beforeEach(() => {
            jest.clearAllMocks();
            spy = jest.spyOn(Log, 'log').mockReturnValue();
            splunk = new Registro_Log();

        });

        it(`dado => una solicitud de registro en splunk
        cuando => el tipo de peticion es Peticion
        entonces => se responde el log con mensaje peticion`, () => {
            loggerSplunk.escribir_registro(splunk, '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', Tipo_Peticion.PETICION);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it(`dado => una solicitud de registro en splunk
        cuando => el tipo de peticion es Error Respuesta
        entonces => se responde el log con Error Respuesta`, () => {
            loggerSplunk.escribir_registro(splunk, '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', Tipo_Peticion.ERROR_RESPUESTA);
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it(`dado => una solicitud de registro en splunk
        cuando => el tipo de peticion es Exito_Peticion
        entonces => se responde el log con Exito_Peticion`, () => {
            loggerSplunk.escribir_registro(splunk, '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', Tipo_Peticion.EXITO_PETICION);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it(`dado => una solicitud de registro en splunk
        cuando => el tipo de peticion es Error_Desconocido
        entonces => se responde el log con Error_Desconocido`, () => {
            loggerSplunk.escribir_registro(splunk, '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', Tipo_Peticion.ERROR_DESCONOCIDO);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it(`dado => una solicitud de registro en splunk
        cuando => el tipo de peticion es Error_Peticion
        entonces => se responde el log con Error_Peticion`, () => {
            loggerSplunk.escribir_registro(splunk, '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', Tipo_Peticion.ERROR_PETICION);
            expect(spy).toHaveBeenCalledTimes(1);
        });


    });

});
