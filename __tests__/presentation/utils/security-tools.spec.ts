import { SecurityTools } from "../../../src/presentation/util/security-tools";

let securityTools: SecurityTools;

describe('Set Pruebas: Securty tools', () => {
    beforeEach(() => {
        securityTools = new SecurityTools();
    });

    it(`dado => una solicitud de encriptar 
    cuando => se optiene un token encriptado
    entonces => se responde el objeto de respuesta`, () => {
        const data = 'datadeprueba';
        const key = 'tokendeprueba';
        const token = '0Yl3rnVe24FO4IFyLdGvkg==';
        const encrypt = securityTools.encrypt3DES(data, key);
        expect(encrypt).toEqual(token);
    })


    it(`dado => una solicitud de desencriptar 
    cuando => se optiene una respuesta 
    entonces => se responde el objeto de respuesta`, () => {
        const data = 'datadeprueba';
        const key = 'tokendeprueba';
        const token = '0Yl3rnVe24FO4IFyLdGvkg==';
        const decrypt = securityTools.decrypt(token, key);
        expect(decrypt).toEqual(data);
    })
});