import { Ejecutor_Llamado_Http } from '../../../src/application/controller/ejecutor-llamado-http';
import { SendMessage } from '../../../src/application/controller/send-message';
import * as dotenv from 'dotenv';
import { App_Multicanal_Registro_Logger } from '../../../src/application/adapters/app-multicanal-registro-logger';
import { App_Cifrado_Parly_Registro_Logger } from '../../../src/application/adapters/app-cifrado-parly-registro-logger';
let mockRes = require('jest-mock-express').response;
let controllerSendMessage: SendMessage;

describe('Set pruebas: envio mensaje a bot', () => {
  let response = null;
  beforeEach(() => {
    response = mockRes();
    jest.resetAllMocks();
    dotenv.config();
    controllerSendMessage = new SendMessage();
  });

  it(`dado => una solicitud de envio de respuesta al multicanal
    cuando => se obiene una respuesta
    entonces => se responde el objeto de respuesta`, async () => {
    const idConversacion = '';
    const idResponse = '';
    const data = { data: { respuesta: [{}, {}] } };
    const spy = jest
      .spyOn(Ejecutor_Llamado_Http.prototype, 'invocar_peticion')
      .mockReturnValue(Promise.resolve(data));
    const spyToken = jest
      .spyOn(controllerSendMessage, 'tokenSendMessage')
      .mockReturnValue(Promise.resolve(data));
    const spyLogger = jest
      .spyOn(App_Multicanal_Registro_Logger.prototype, 'generar_registro')
      .mockReturnValue(null);

    const resultado = await controllerSendMessage.sendMessage(
      idConversacion,
      data,
      idResponse,
      '',
      'botId',
      response
    );
    expect(resultado).toBeTruthy();
    expect(spy).toHaveBeenCalled();
    expect(spyToken).toHaveBeenCalled();
    expect(spyLogger).toHaveBeenCalled();
  });

  it(`dado => una solicitud de envio de encriptacion de datos a parly
    cuando => se obiene una respuesta
    entonces => se responde el objeto de respuesta`, async () => {
    const idConversacion = 'whatsapp_573195533012';
    const idResponse = '';
    const data = { data: { respuesta: [{}, {}] } };
    const spy = jest
      .spyOn(Ejecutor_Llamado_Http.prototype, 'invocar_peticion')
      .mockReturnValue(Promise.resolve(data));
    const spyLogger = jest
      .spyOn(App_Cifrado_Parly_Registro_Logger.prototype, 'generar_registro')
      .mockReturnValue(null);

    const resultado = await controllerSendMessage.sendMessage(
      idConversacion,
      data,
      idResponse,
      '',
      '',
      response
    );
    expect(resultado).toBeTruthy();
    expect(spy).toHaveBeenCalled();
    expect(spyLogger).toHaveBeenCalled();
  });
});
