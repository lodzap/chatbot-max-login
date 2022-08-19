const moment = require('moment-timezone');
moment.locale('es');
import * as dotenv from 'dotenv';
import { ServicioUrl } from '../../../src/application/services/servicio-url';

describe('Set pruebas: servicios de authMail', () => {
  let servicio: ServicioUrl;
  beforeEach(() => {
    dotenv.config();
    jest.resetAllMocks();
    servicio = new ServicioUrl();
  });

  it(`dado => una solicitud al servicio get url en miEtb
        cuando => se manda mensaje a parly
        entonces => se responde el objeto de respuesta de fecha dinamica`, async () => {
    const req = {
      body: {
        nombreUrl: 'Compra_carta',
        telefono: '3102392934',
        canal: 'Web',
        from: 'MIETB',
        idConversacion: 'sessionId',
        token: 'UVEvbCtEdXhxRlptQllDeTZJS0daMzJpZnd3c3BxMHdvWEJ1V1RNUjVzdz0=',
        nombreBot: 'sdsd',
        Score: 'sdsds',
        palabraClave: 'cerrar',
      },
    };
    const respuesta = servicio.genenrarUrl(req);
    expect(respuesta).toBeDefined();
  });

  it(`dado => una solicitud al servicio get url en miEtb
    cuando => se manda mensaje a parly
    entonces => se responde el objeto de respuesta de fecha dinamica`, async () => {
    const req = {
      body: {
        nombreUrl: 'Cobertura',
        telefono: '3102392934',
        canal: 'Web',
        from: 'MIETB',
        idConversacion: 'sessionId',
        token: 'UVEvbCtEdXhxRlptQllDeTZJS0daMzJpZnd3c3BxMHdvWEJ1V1RNUjVzdz0=',
        nombreBot: 'sdsd',
        Score: 'sdsds',
        palabraClave: 'cerrar',
      },
    };
    const respuesta = servicio.genenrarUrl(req);
    expect(respuesta).toBeTruthy();
  });

  it(`dado => una solicitud al servicio get url en miEtb
    cuando => se manda mensaje a parly
    entonces => se responde el objeto de respuesta de fecha dinamica`, async () => {
    const req = {
      body: {
        nombreUrl: 'Compra_bolsas',
        telefono: '3102392934',
        canal: 'Web',
        from: 'MIETB',
        idConversacion: 'sessionId',
        token: 'UVEvbCtEdXhxRlptQllDeTZJS0daMzJpZnd3c3BxMHdvWEJ1V1RNUjVzdz0=',
        nombreBot: 'sdsd',
        Score: 'sdsds',
        palabraClave: 'cerrar',
      },
    };
    const respuesta = servicio.genenrarUrl(req);
    expect(respuesta).toBeTruthy();
  });
  it(`dado => una solicitud al servicio get url en miEtb
    cuando => se manda mensaje a parly
    entonces => se responde el objeto de respuesta de fecha dinamica`, async () => {
    const req = {
      body: {
        nombreUrl: 'Cambio_plan',
        telefono: '3102392934',
        canal: 'Web',
        from: 'MIETB',
        idConversacion: 'sessionId',
        token: 'UVEvbCtEdXhxRlptQllDeTZJS0daMzJpZnd3c3BxMHdvWEJ1V1RNUjVzdz0=',
        nombreBot: 'sdsd',
        Score: 'sdsds',
        palabraClave: 'cerrar',
      },
    };
    const respuesta = servicio.genenrarUrl(req);
    expect(respuesta).toBeTruthy();
  });

  it(`dado => una solicitud al servicio get url en miEtb
    cuando => se manda mensaje a parly
    entonces => se responde el objeto de respuesta de fecha dinamica`, async () => {
    const req = {
      body: {
        nombreUrl: 'Consulta_adicion',
        telefono: '3102392934',
        canal: 'Web',
        from: 'MIETB',
        idConversacion: 'sessionId',
        token: 'UVEvbCtEdXhxRlptQllDeTZJS0daMzJpZnd3c3BxMHdvWEJ1V1RNUjVzdz0=',
        nombreBot: 'sdsd',
        Score: 'sdsds',
        palabraClave: 'cerrar',
      },
    };
    const respuesta = servicio.genenrarUrl(req);
    expect(respuesta).toBeTruthy();
  });

  it(`dado => una solicitud al servicio get url en miEtb
    cuando => se manda mensaje a parly
    entonces => se responde el objeto de respuesta de fecha dinamica`, async () => {
    const req = {
      body: {
        nombreUrl: 'Consulta_SVA',
        telefono: '3102392934',
        canal: 'Web',
        from: 'MIETB',
        idConversacion: 'sessionId',
        token: 'UVEvbCtEdXhxRlptQllDeTZJS0daMzJpZnd3c3BxMHdvWEJ1V1RNUjVzdz0=',
        nombreBot: 'sdsd',
        Score: 'sdsds',
        palabraClave: 'cerrar',
      },
    };
    const respuesta = servicio.genenrarUrl(req);
    expect(respuesta).toBeFalsy();
  });

  it(`dado => una solicitud al servicio get url en miEtb
    cuando => se manda mensaje a parly
    entonces => se responde el objeto de respuesta de fecha dinamica`, async () => {
    const req = {
      body: {
        nombreUrl: 'Calendario_web',
        telefono: '3102392934',
        canal: 'Web',
        from: 'MIETB',
        idConversacion: 'sessionId',
        token: 'UVEvbCtEdXhxRlptQllDeTZJS0daMzJpZnd3c3BxMHdvWEJ1V1RNUjVzdz0=',
        nombreBot: 'sdsd',
        Score: 'sdsds',
        palabraClave: 'cerrar',
      },
    };
    const respuesta = servicio.genenrarUrl(req);
    expect(respuesta).toBeFalsy();
  });

  it(`dado => una solicitud al servicio get url en miEtb
  cuando => se manda mensaje a parly
  entonces => sse responde la url correspondiente al Registro`, async () => {
    const req = {
      body: {
        nombreUrl: 'Registro',
        telefono: '3102392934',
        canal: 'Web',
        from: 'MIETB',
        idConversacion: 'sessionId',
        token: 'UVEvbCtEdXhxRlptQllDeTZJS0daMzJpZnd3c3BxMHdvWEJ1V1RNUjVzdz0=',
        nombreBot: 'sdsd',
        Score: 'sdsds',
        palabraClave: 'cerrar',
      },
    };
    const respuesta = servicio.genenrarUrl(req);
    expect(respuesta).toBeDefined();
  });

  it(`dado => una solicitud al servicio get url en miEtb
  cuando => se manda mensaje a parly
  entonces => se responde la url correspondiente al Traslado`, async () => {
    const req = {
      body: {
        nombreUrl: 'Traslado',
        telefono: '3102392934',
        canal: 'Web',
        from: 'MIETB',
        idConversacion: 'sessionId',
        token: 'UVEvbCtEdXhxRlptQllDeTZJS0daMzJpZnd3c3BxMHdvWEJ1V1RNUjVzdz0=',
        nombreBot: 'sdsd',
        Score: 'sdsds',
        palabraClave: 'cerrar',
        technology: 'LWbeKhLiwro=',
      },
    };
    const respuesta = servicio.genenrarUrl(req);
    expect(respuesta).toBeDefined();
  });

  it(`dado => una solicitud al servicio get url en miEtb
  cuando => se manda mensaje a parly con el nombre de la url vacio
  entonces => deberia retornar undefined`, async () => {
    const req = {
      body: {
        nombreUrl: '',
        telefono: '3102392934',
        canal: 'Web',
        from: 'MIETB',
        idConversacion: 'sessionId',
        token: 'UVEvbCtEdXhxRlptQllDeTZJS0daMzJpZnd3c3BxMHdvWEJ1V1RNUjVzdz0=',
        nombreBot: 'sdsd',
        Score: 'sdsds',
        palabraClave: 'cerrar',
        technology: 'LWbeKhLiwro=',
      },
    };
    const respuesta = servicio.genenrarUrl(req);
    expect(respuesta).toBeUndefined();
  });
});
