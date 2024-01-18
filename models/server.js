const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {};

        // Middlewares

        this.middlewares();

        this.routes();

        this.sockets();
    }

    //Llamada en el constructor
    middlewares() {

        //CORS
        this.app.use(cors());

        // Directorio publico
        this.app.use(express.static('public'));
    
    }

    //Llamada en el constructor
    routes() {

        // this.app.use(this.paths.auth, require('../routes/auth'))

    }

    sockets() {
        this.io.on('connection', socketController)
    }

    //Llamada desde afuera
    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }

};

module.exports = Server;