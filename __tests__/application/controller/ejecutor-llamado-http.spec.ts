import axios from 'axios';
import { Ejecutor_Llamado_Http } from '../../../src/application/controller/ejecutor-llamado-http'
import { Registro_Log } from "../../../src/domain/model/registro-log";
import { Escritura_Logger_Use_Case } from '../../../src/domain/use-cases/escritura-logger-use-case';
import { Tipo_Peticion } from '../../../src/domain/model/tipo-peticion';

describe('Test de pruebas: ejecutor lamadas http', () => {
    const ejecutorLlamadoHttp = new Ejecutor_Llamado_Http();
    

    beforeEach(() => {
        jest.clearAllMocks();
    });
    it(`dado => una invocacion de peticion http
    cuando => la petición sea exitosa
    entonces => se responde con el objeto de respuesta de la peticion`, async () => {
        const configuracion = { headers: { 'X-tracing_id': '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' } };
        const spyAxios = jest.spyOn(axios, 'request').mockReturnValue(Promise.resolve(configuracion));
        const spySplunkRequest = jest.spyOn(Escritura_Logger_Use_Case.prototype, 'escribir_registro').mockReturnValue();
        const splunk = new Registro_Log();
        const resultado = await ejecutorLlamadoHttp.invocar_peticion(configuracion, splunk);
        expect(resultado).toBeTruthy();
        expect(spyAxios).toHaveBeenCalled();
        expect(spySplunkRequest).toHaveBeenCalled();
    });
    it(`dado => una invocacion de peticion http
    cuando => la petición sea fallida por response
    entonces => se responde con el mensaje de error`, async () => {
        const configuracion = { headers: { 'X-tracing_id': '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' } };
        const spyAxios = jest.spyOn(axios, 'request').mockReturnValue(Promise.reject({ response: {} }));
        const spySplunkRequest = jest.spyOn(Escritura_Logger_Use_Case.prototype, 'escribir_registro').mockReturnValue();
        const splunk = new Registro_Log();
        const resultado = await ejecutorLlamadoHttp.invocar_peticion(configuracion, splunk);
        expect(resultado).toBeTruthy();
        expect(spyAxios).toHaveBeenCalled();
        expect(spySplunkRequest).toHaveBeenCalled();

    });

    it(`dado => una invocacion de peticion http
    cuando => la petición sea fallida por request
    entonces => se responde con el mensaje de error`, async () => {
        const configuracion = { headers: { 'X-tracing_id': '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' } };
        const spyAxios = jest.spyOn(axios, 'request').mockReturnValue(Promise.reject({ request: {} }));
        const splunk = new Registro_Log();
        const spySplunkRequest = jest.spyOn(Escritura_Logger_Use_Case.prototype, 'escribir_registro').mockReturnValue();
        const resultado = await ejecutorLlamadoHttp.invocar_peticion(configuracion, splunk);
        expect(resultado).toBeTruthy();
        expect(spyAxios).toHaveBeenCalled();
        expect(spySplunkRequest).toHaveBeenCalled();
    });
    it(`dado => una invocacion de peticion http
    cuando => la petición sea fallida 
    entonces => se responde con el mensaje de error`, async () => {
        const configuracion = {};
        const spyAxios = jest.spyOn(axios, 'request').mockReturnValue(Promise.reject({}));
        const splunk = new Registro_Log();
        const spySplunkRequest = jest.spyOn(Escritura_Logger_Use_Case.prototype, 'escribir_registro').mockReturnValue();
        const resultado = await ejecutorLlamadoHttp.invocar_peticion(configuracion, splunk);
        expect(resultado).toBeTruthy();
        expect(spyAxios).toHaveBeenCalled();
        expect(spySplunkRequest).toHaveBeenCalled();
    });


    //fetch
    /* it(`dado => una invocacion de peticion http
    cuando => la petición sea exitosa
    entonces => se responde con el objeto de respuesta de la peticion`, async () => {
        const configuracion = { headers: { 'X-tracing_id': '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' } };
     const response = { status, json: () => Promise.resolve(configuracion) };
        const spyFetch = jest.spyOn(global, 'fetch').mockReturnValue(response)
      
          
        
        
        const spySplunkRequest = jest.spyOn(Escritura_Logger_Use_Case.prototype, 'escribir_registro').mockReturnValue();
        const splunk = new Registro_Log();
        const resultado = await ejecutorLlamadoHttp.invocar_peticion(configuracion, splunk);
        expect(resultado).toBeTruthy();
        expect(global.fetch).toHaveBeenCalled();
        expect(spySplunkRequest).toHaveBeenCalled();
    });
    it(`dado => una invocacion de peticion http
    cuando => la petición sea fallida por response
    entonces => se responde con el mensaje de error`, async () => {
        const configuracion = { headers: { 'X-tracing_id': '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' } };
        const spyAxios = jest.spyOn(axios, 'request').mockReturnValue(Promise.reject({ response: {} }));
        const spySplunkRequest = jest.spyOn(Escritura_Logger_Use_Case.prototype, 'escribir_registro').mockReturnValue();
        const splunk = new Registro_Log();
        const resultado = await ejecutorLlamadoHttp.invocar_peticion(configuracion, splunk);
        expect(resultado).toBeTruthy();
        expect(spyAxios).toHaveBeenCalled();
        expect(spySplunkRequest).toHaveBeenCalled();

    });

    it(`dado => una invocacion de peticion http
    cuando => la petición sea fallida por request
    entonces => se responde con el mensaje de error`, async () => {
        const configuracion = { headers: { 'X-tracing_id': '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' } };
        const spyAxios = jest.spyOn(axios, 'request').mockReturnValue(Promise.reject({ request: {} }));
        const splunk = new Registro_Log();
        const spySplunkRequest = jest.spyOn(Escritura_Logger_Use_Case.prototype, 'escribir_registro').mockReturnValue();
        const resultado = await ejecutorLlamadoHttp.invocar_peticion(configuracion, splunk);
        expect(resultado).toBeTruthy();
        expect(spyAxios).toHaveBeenCalled();
        expect(spySplunkRequest).toHaveBeenCalled();
    });
    it(`dado => una invocacion de peticion http
    cuando => la petición sea fallida 
    entonces => se responde con el mensaje de error`, async () => {
        const configuracion = {};
        const spyAxios = jest.spyOn(axios, 'request').mockReturnValue(Promise.reject({}));
        const splunk = new Registro_Log();
        const spySplunkRequest = jest.spyOn(Escritura_Logger_Use_Case.prototype, 'escribir_registro').mockReturnValue();
        const resultado = await ejecutorLlamadoHttp.invocar_peticion(configuracion, splunk);
        expect(resultado).toBeTruthy();
        expect(spyAxios).toHaveBeenCalled();
        expect(spySplunkRequest).toHaveBeenCalled();
    }); */

});
