const express = require('express');
const cors = require('cors');
const doConnection = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosRoutePath = '/api/usuarios';
        this.authPath = '/api/login';
        
        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await doConnection();
    }

    middlewares() {

        
        this.app.use( cors() );
        
        this.app.use( express.json() );

        this.app.use( express.static('public') );
        
    }

    routes() {
        this.app.use(this.usuariosRoutePath, require('../routes/usuario'));

        this.app.use(this.authPath, require('../routes/login'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server corriendo en: ${ this.port }`);
        });
    }

}

module.exports = Server;