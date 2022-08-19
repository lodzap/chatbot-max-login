import { NextFunction, Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { BaseRoute } from './route';
import { readFileSync } from 'fs';
import { ServiceAuthMail } from '../../application/services/servicio-auth-mail';
import { ServiceSendMessage } from '../../application/services/servicio-send-message';
import { Configuraciones } from '../../application/controller/configuraciones';
import { HealthChecker } from '../../application/controller/health';
import { SecurityTools } from '../util/security-tools';
import { ServicioUrl } from '../../application/services/servicio-url';

/**
 * route
 *
 * @class User
 */
export class IndexRoute extends BaseRoute {
  private static _servicio_url = new ServicioUrl();

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
    });

    router.get(
      '/etbauth/api/configuraciones',
      (req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
          'Access-Control-Allow-Headers',
          'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
        );
        res.header(
          'Access-Control-Allow-Methods',
          'GET, POST, OPTIONS, PUT, DELETE'
        );
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        res.json(new Configuraciones());
      }
    );

    router.get(
      '/etbauth/js/chat-box.js',
      (req: Request, res: Response, next: NextFunction) => {
        let ruta: string =
          __dirname.replace(/\\/g, '/') + '/js/chat-box-template.js';
        ruta = ruta.replace('presentation/routes', 'public');
        let template = readFileSync(ruta, 'utf8');
        template = template.replace(/&&urlbase&&/g, process.env.URL_BASE);

        res.type('application/javascript');
        res.contentType('application/javascript');
        res.header('Content-Length', template.length.toString());
        res.send(template);
        next();
      }
    );

    router.post(
      '/etbauth/api/logincancel',
      async (req: Request, res: Response, next: NextFunction) => {
        const data = {
          login: false,
          menssage: 'autenticación cancelada',
        };
        const uuid = uuidv4();
        const sendMessage = await new ServiceSendMessage().sendMessage(
          req.body.idConversacion,
          data,
          'LoginCancel',
          uuid,
          process.env.BOT_ID,
          res
        );
        res.json({ Respuesta: sendMessage.data });
      }
    );

    router.post(
      '/etbauth/api/authetb',
      async (req: any, res: Response, next: NextFunction) => {
        const uuid = uuidv4();
        req.tracingId = uuid;
        const authMail = await new ServiceAuthMail().authMail(req, res, next);

        console.log("hola",req.body);
        const sendMessage = await new ServiceSendMessage().sendMessage(
          req.body.idConversacion,
          authMail.data,
          'LoginAuth',
          uuid,
          process.env.BOT_ID,
          res
        );
        
        res.json({ Respuesta: sendMessage.data });
      }
    );

    router.post(
      '/etbauth/api/authetb-companies',
      async (req: any, res: Response, next: NextFunction) => {
        const uuid = uuidv4();
        req.tracingId = uuid;
        const authMailCompanies = await new ServiceAuthMail().authCompanies(
          req
        );

        console.log('authMailCompanies =>', authMailCompanies);

        const sendMessage = await new ServiceSendMessage().sendMessage(
          req.body.idConversacion,
          authMailCompanies,
          'LoginAuthCompanies',
          uuid,
          process.env.BOT_ID,
          res
        );

        console.log('Send =>', sendMessage);
        res.json({ Respuesta: sendMessage.data });
      }
    );

    router.all(
      '/etbauth/api/health',
      (req: Request, res: Response, next: NextFunction) => {
        new HealthChecker(req, res, next).check();
      }
    );

    router.post(
      '/etbauth/api/send-message',
      async (req: Request, res: Response, next: NextFunction) => {
        if (
          !req.body.idConversacion ||
          !req.body.data ||
          !req.body.palabraClave ||
          !req.body.botId
        ) {
          res.statusCode = 400;
          res.statusMessage = 'Bad Request';
          res.send({ Respuestas: 'Datos incompletos' });
          return;
        }
        console.log('send-message', req.body);
        const uuid = uuidv4();
        const sendMessage = await new ServiceSendMessage().sendMessage(
          req.body.idConversacion,
          req.body.data,
          req.body.palabraClave,
          uuid,
          req.body.botId,
          res
        );
        res.json({ Respuesta: sendMessage.data });
      }
    );

    router.post(
      '/etbauth/api/get-url',
      async (req: Request, res: Response, next: NextFunction) => {
        const url = IndexRoute._servicio_url.genenrarUrl(req);
        res.json({ Respuesta: url });
      }
    );
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = 'Home | Template';

    //set options
    let options: Object = {
      message: 'Welcome to the Template in node JS',
    };

    res.status(200).send('Correcto').end();
  }
}
