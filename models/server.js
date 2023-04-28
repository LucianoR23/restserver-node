const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            auth: '/api/auth',
            categories: '/api/categories',
            users: '/api/users',
            products: '/api/products',
        }

        this.conectarDB();

        // Middlewares
        this.middlewares();


        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        this.app.use( cors() )

        // Lectura y parseo del body
        this.app.use( express.json() );

        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.path.auth, require('../routes/auth'))
        this.app.use(this.path.categories, require('../routes/categories'))
        this.app.use(this.path.users, require('../routes/users'))
        this.app.use(this.path.products, require('../routes/products'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }


}


module.exports = Server;