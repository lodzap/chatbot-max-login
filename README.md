# README

Este repositorio fue creado para la aplicacion de etb chatbot en whatsapp.. por medio de un link que aparecera en la conversacion de whatsapp esta aplicacion se ejecutara para hacer una autentificacion de etb y posteriormente rediriger a la conversacion, enviando por debajo el estado de la autentificacion

### Documentación -

- Teams proyecto - konecta-etb-chatbot-servicio-mesasoporte
- Documentacion linea base - **proximamente**

### Sonar

- **Nombre**: konecta-etb-chatbot-servicio-mesasoporte
- **Url**: url sonar

### Cómo correr la aplicación local

1. Crear folder vacío
2. git clone https://sancheztaborda@bitbucket.org/pmolano/konecta-etb-chatbot-servicio-mesasoporte.git
3. cd konecta-etb-chatbot-servicio-mesasoporte
4. git flow init
5. npm install
6. npm run dev

# README

### Prerrequisitos

- node versión 12.x.x
- Visual Studio Code IDE
- Git
- [Permisos al repositorio konecta-sura-pac](https://sancheztaborda@bitbucket.org/pmolano/konecta-etb-chatbot-servicio-mesasoporte.git)

### Proyecto en los que está implementado

chatbot-chatbot-view-etb

### Cómo correr la aplicación local

Control de dependencias: npm

1. Ubicarse en la carpeta raíz del proyecto
2. Ejecutar npm install
3. Ejecutar npm run dev

### changelog

- V.1.0.0: Implementación autentificacionwhatsappyfacebook
- V.1.0.1: Logger splunk
- V.1.0.2: Servicio get url para obtener la url de consulta en la conversacion
- V.1.0.3: Se añade al servico get url dos nuevos bloques, los cuales permiten la creacíon de nuevas urls (Registro y Traslado)
- V.1.0.4: Se actualizan credenciales del servicio de autenticacion de empresas y se agrega variable de entorno para el sitio de registro de etb(iframe)
