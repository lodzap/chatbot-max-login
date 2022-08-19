export class Configuraciones {
    constructor() { }
    url_messenger: string = process.env.URL_MESSENGER;
    url_api_whatsapp: string = process.env.URL_API_WHATSAPP;
    phone_personas: string = process.env.PHONE_PERSONAS;
    phone_empresas: string = process.env.PHONE_EMPRESAS;
    keytokenmail: string = process.env.KEY_TOKEN_MAIL;
    canal_facebook: string = process.env.CANAL_FACEBOOK;
}