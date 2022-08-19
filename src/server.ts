import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as path from 'path';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');
import { IndexRoute } from './presentation/routes/index';
import * as dotenv from 'dotenv';
import { SetParamsEnviroment } from './presentation/util/setParams.util';
var helmet = require('helmet');
const cors = require('cors');
/**
 * The server.
 *
 * @class Server
 */
export class Server {
  public app: express.Application;
  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

    // configure application
    this.config();

    //add routes
    this.routes();

    //add api
    this.api();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    //empty for now
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    dotenv.config({ path: '.env' });

    this.app.use(cors());

    // //use json form parser middlware
    this.app.use(bodyParser.json());

    // //use query string parser middlware
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    // //use cookie parker middleware middlware
    this.app.use(cookieParser('SECRET_GOES_HERE'));

    // //use override middlware
    this.app.use(methodOverride());

    //catch 404 and forward to error handler
    this.app.use(function (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      err.status = 404;
      next(err);
    });

    //     //error handling
    this.app.use(errorHandler());

    //cache global
    // let cache = apicache.middleware

    // this.app.use(cache(this.timeCache));

    this.app.use(helmet());

    this.app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', 'http://201.245.171.131/');
      res.setHeader('Access-Control-Allow-Origin', 'https://etb.com/');
      res.setHeader('Access-Control-Allow-Origin', 'http://etbserver.etb.co/');
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081/');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
      );
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
    });

    this.app.disable('x-powered-by');

    //add static paths
    this.app.use('/etbauth', express.static(path.join(__dirname, 'public')));

    //set variables
    new SetParamsEnviroment().asignarVariables();
  }

  /**
   * Create router.
   *
   * @class Server
   * @method config
   * @return void
   */
  private routes() {
    let router: express.Router;
    router = express.Router();

    //IndexRoute
    IndexRoute.create(router);

    //use router middleware
    this.app.use(router);
  }
}
