import { Escritura_Logger } from "../../../src/domain/use-cases/logic/escritura-logger";
import { Escritura_Logger_Use_Case } from '../../../src/domain/use-cases/escritura-logger-use-case';
import { Tipo_Peticion } from "../../../src/domain/model/tipo-peticion";
import { mock } from 'jest-mock-extended';
import { Registro_Log } from "../../../src/domain/model/registro-log";

describe('Set de pruebas: escritura en splunk caso de uso', () => {
    const mockEscritura = mock<Escritura_Logger>();
    const escritura = new Escritura_Logger_Use_Case(mockEscritura);

    it(`dado => una solicitud escribir registro en logger
    cuando => se invoca la interfaz Escritura_Logger
    entonces => se escribe registro segun tipo de peticion`, () => {
        const logger = new Registro_Log();
        mockEscritura.escribir_registro(logger, '', Tipo_Peticion.PETICION);
        escritura.escribir_registro(logger, '', Tipo_Peticion.PETICION);
        expect(mockEscritura.escribir_registro).toHaveBeenCalledWith(logger, '', Tipo_Peticion.PETICION);
    });

})