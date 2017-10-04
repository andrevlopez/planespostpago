# Requisitos    
Para el uso correcto de este repositorio debera instalar:
- Node.js
- Gulp
- Bower
- Nodemon

# Instalacion

Clona el repositorio:
`` $ git clone ``
Instala las dependencias del backend:    
`` $ npm install ``    
Instala las dependencias del front end    
`` $ cd front``    
`` $ npm install && bower install ``

# Uso
## Front end
Ubicate en el directorio ``/front``.    
`` $ cd front ``     
Inicia el modo desarrollo(recargas automaticas y logs):     
`` gulp serve``     
Haz los cambios que necesites, y luego compila la version de produccion.     
`` gulp build:dist``     
Se generara una carpeta ``/dist`` la cual es usada es servida por express.     

## Back End
Inicia el servidor:     
`` npm start ``     
Tambien puedes iniciar el servidor en modo desarrollo(recargas automaticas y logs):     
`` npm run dev ``     


Autor: Cesar Jr Rodriguez.
