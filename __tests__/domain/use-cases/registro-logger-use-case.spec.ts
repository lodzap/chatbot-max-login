import { mock } from 'jest-mock-extended';
import { Registro_Logger } from '../../../src/domain/use-cases/logic/registro-logger';;
import { Registro_Logger_Use_Case } from '../../../src/domain/use-cases/registro-logger-use-case';
import { Registro_Log } from '../../../src/domain/model/registro-log';

describe('Set de pruebas: llamado http caso de uso', () => {
    const mockRegistro = mock<Registro_Logger>();
    const registroSplunk = new Registro_Logger_Use_Case(mockRegistro);

    it(`dado => una solicitud de registro en logger
    cuando => se invoca la interfaz
    entonces => se genera un registro de logger`, () => {
        const logger = new Registro_Log();
        mockRegistro.generar_registro(logger);
        registroSplunk.generar_registro(logger);
        expect(mockRegistro.generar_registro).toHaveBeenCalledWith(logger);
    })

});