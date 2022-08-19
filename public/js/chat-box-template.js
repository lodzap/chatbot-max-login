const pratech = {};
pratech.parly = {
  data: {},
  tipodocumento: '',
  parly_ND: '',
  nombres: '',
  apellidos: '',
  celular: '',
  ciudad: '',
  mandarcorreo: false,
  email: '',
  lastMessageUser: '',
  lastMessageBot: '',
  messagevisitor: true,
  historiachat: '',
  src: null,
  urlBase: '&&urlbase&&',
  prechat: true,
  timeLastmessageParameter: 600000,

  getUrlBaseJS: function () {
    return this.urlBase + 'js/';
  },

  isChrome:
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime),

  initAuth: function () {
    jqchat(document).ready(function () {
      pratech.parly._injectReferences();
      pratech.parly._consultarConfiguraciones();
    });
  },

  _consultarConfiguraciones: function () {
    return new Promise(function (resolve, reject) {
      jqchat.ajax({
        contentType: 'application/json; charset=utf-8',
        async: false,
        url: pratech.parly.urlBase + 'api/configuraciones',
        dataType: 'json',
        type: 'GET',
        cache: false,
        success: function (myJson) {
          pratech.parly.data = myJson;
          resolve('configuraciones cargadas');
        },
      });
    });
  },

  hideAlertsLogin: function () {
    jqchat('#alertLoginMail').css('display', 'none');
    jqchat('#alertLoginPass').css('display', 'none');
    jqchat('#alertLoginIncompletos').css('display', 'none');
  },

  hideLoginForm: function () {
    jqchat('#formLoginAside').remove();
  },

  _validateLoginForm(mail, password) {
    let response = true;
    //let patternPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    let patternPass = /^(?=.*[a-z!#$%&'*+])(?=.*[A-Z!#$%&'*+])(?=.*\d)[a-zA-Z!#$%&'*+\d]{8,}$/;

    let patternMail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    
    if (!patternMail.test(mail)) {
      jqchat('#alertLoginMail').css('display', 'block');
      return false;
    }
    if (!patternPass.test(password)) {
      jqchat('#alertLoginPass').css('display', 'block');
      return false;
    }
    return response;
  },

  _loginCancel: function () {
    setTimeout(function () {}, 500);
    var botid = pratech.parly.getParameterByName('botid');
    jqchat('#loadingSpinner').css('display', 'flex');
    jqchat
      .ajax({
        url: pratech.parly.urlBase + 'api/logincancel',
        dataType: 'json',
        type: 'POST',
        data: {
          idConversacion: botid,
        },
      })
      .done(function (data) {
        jqchat('#loadingSpinner').css('display', 'none');
        pratech.parly._redirigir_a_conversacion();
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR + 'sssss' + textStatus + 'sssss' + errorThrown);
      });
  },

  _loginConfirm: function (event) {
    //es necesario hablar con el entrenador pra recibir historial,idbot,numerotelefonico,el canal
    event.preventDefault();
    let loginEmail = jqchat('#pratechemail').val();
    let loginPass = jqchat('#pratechpassword').val();
    if (loginEmail === '' || loginPass === '') {
      jqchat('#alertLoginIncompletos').css('display', 'block');
    } else {
      if (pratech.parly._validateLoginForm(loginEmail, loginPass)) {
        pratech.parly._authLogin(loginEmail, loginPass, 'personas');
      }
    }
  },
  _validateCompaniesForm: function (name, password) {
    let response = true;
    /* let patternPass = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    
    if(patternPass.test(password)){
      jqchat("#alertPass").css("display", "none")
    }else{
      jqchat("#alertPass").css("display", "block")
      response = false
      
    } */
    return response;
  },

  _loginConfirmCompanies: function (event) {
    //es necesario hablar con el entrenador pra recibir historial,idbot,numerotelefonico,el canal
    event.preventDefault();
    let name = jqchat('#name').val();
    let password = jqchat('#password').val();
    if (name === '' || password === '') {
      jqchat('#alertLoginIncompletos').css('display', 'block');
    } else {
      if (pratech.parly._validateCompaniesForm(name, password)) {
        pratech.parly._authLogin(name, password, 'companias');
      }
    }
  },

  _authLogin: function (mail, password, tipo) {
    //necesito botid/canal/numero/
    jqchat('#loadingSpinner').css('display', 'flex');
    var url = '';
    if (tipo === 'personas') {
      url = pratech.parly.urlBase + 'api/authetb';
    } else {
      url = pratech.parly.urlBase + 'api/authetb-companies';
    }
    jqchat
      .ajax({
        url: url,
        dataType: 'json',
        type: 'POST',
        data: {
          mail: mail,
          password: password,
          idConversacion: pratech.parly.getParameterByName('botid'),
        },
      })
      .done(function (data) {
        pratech.parly._redirigir_a_conversacion();
      });
  },

  _redirigir_a_conversacion() {
    if (pratech.parly.getParameterByName('canal') == 'whatsapp') {
      if (pratech.parly.getParameterByName('dirigido') == 'personas') {
        window.location =
          pratech.parly.data.url_api_whatsapp +
          pratech.parly.data.phone_personas;
      } else {
        window.location =
        pratech.parly.data.url_api_whatsapp +
          pratech.parly.data.phone_empresas;
      }
    } else {
      window.location = pratech.parly.data.url_messenger + pratech.parly.data.canal_facebook;
    }
    jqchat('#loadingSpinner').css('display', 'none');
  },

  getParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regexS = '[\\?&]' + name + '=([^&#]*)';
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) return '';
    else return decodeURIComponent(results[1].replace(/\+/g, ' '));
  },

  /**
   * metodo de que muestra el ultimo mensaje del bot y del usuario
   *
   * @param {*} activity
   */

  _injectReferences: function () {
    jqchat('head').append(
      jqchat('<link rel="stylesheet" type="text/css" />').attr(
        'href',
        pratech.parly.urlBase + 'css/styles.css'
      )
    );

    var promesa_jqchat = new Promise(function (resolve, reject) {
      jqchat
        .ajax({
          url: pratech.parly.getUrlBaseJS() + 'jquery.ui.jqchat.js',
          dataType: 'script',
          cache: true,
        })
        .done(function (script, textStatus) {
          console.log(
            'load ' + pratech.parly.getUrlBaseJS() + 'jquery.ui.jqchat.js'
          );
          resolve('ui.jqchat loaded');
        });
    });

    return new Promise(function (resolve, reject) {
      Promise.all([promesa_jqchat]).then(
        function (values) {
          resolve(values);
        },
        function (reason) {
          // console.log(reason);
          reject(reason);
        }
      );
    });
  },

  getScript: function (source, callback) {
    let script = document.createElement('script');
    let prior = document.getElementsByTagName('script')[0];
    script.async = 1;

    script.onload = script.onreadystatechange = function (_, isAbort) {
      if (
        isAbort ||
        !script.readyState ||
        /loaded|complete/.test(script.readyState)
      ) {
        script.onload = script.onreadystatechange = null;
        script = undefined;
        if (!isAbort) if (callback) callback();
      }
    };

    script.src = source;
    prior.parentNode.insertBefore(script, prior);
  },
};

document.addEventListener('DOMContentLoaded', function () {
  pratech.parly.getScript(
    pratech.parly.getUrlBaseJS() + 'jqchat.js',
    function () {
      pratech.parly.initAuth();
    }
  );
});
