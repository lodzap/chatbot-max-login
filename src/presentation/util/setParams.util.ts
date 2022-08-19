import { Endpoint } from '../endpoint';

// Centraliza la lectura de las variables de entorno.

export class SetParamsEnviroment {
  constructor() {}

  public asignarVariables() {
    Endpoint.ORIGIN_APP = process.env.ORIGIN_APP;
    Endpoint.TOKEN_SEND_MESSAGE = process.env.TOKEN_SEND_MESSAGE;
    Endpoint.URL_SEND_MESSAGE = process.env.URL_SEND_MESSAGE;
    Endpoint.BOT_ID = process.env.BOT_ID;
    Endpoint.URL_ENCRYPT_ID = process.env.URL_ENCRYPT_ID;
    Endpoint.URL_MESSENGER = process.env.URL_MESSENGER;
    Endpoint.URL_API_WHATSAPP = process.env.URL_API_WHATSAPP;
    Endpoint.PHONE_EMPRESAS = process.env.PHONE_EMPRESAS;
    Endpoint.PHONE_PERSONAS = process.env.PHONE_PERSONAS;
    Endpoint.CANAL_FACEBOOK = process.env.CANAL_FACEBOOK;

    // splunk
    Endpoint.PRODUCTS_LOGGER_PRODUCT_ID =
      process.env.PRODUCTS_LOGGER_PRODUCT_ID;
    Endpoint.PRODUCTS_LOGGER_SOLUTION_ID =
      process.env.PRODUCTS_LOGGER_SOLUTION_ID;
    Endpoint.PRODUCTS_LOGGER_SYSTEM_ID = process.env.PRODUCTS_LOGGER_SYSTEM_ID;
    Endpoint.PRODUCTS_LOGGER_APPLICATION =
      process.env.PRODUCTS_LOGGER_APPLICATION;
    Endpoint.PRODUCTS_LOGGER_URL = process.env.PRODUCTS_LOGGER_URL;
    Endpoint.CUSTOMER_ID = process.env.CUSTOMER_ID;

    // Login compañias
    Endpoint.URL_LOGIN_COMPANIAS = process.env.URL_LOGIN_COMPANIAS;
    Endpoint.USR = process.env.ETB_AUTH_USR;
    Endpoint.PWD = process.env.ETB_AUTH_PWD;
  }
}
