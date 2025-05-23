require('colors')
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const template = express.static(__dirname + '/public');
const { MICROSERVICE_NAME } = require('./utils/constants.js');
const { connectToDatabase } = require('./db');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true })) 
app.use(cors());

// Rutas personalizadas
app.get('/', (req, res) => {
    res.send('Hola, el servidor está funcionando correctamente!');
});

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/', template);
app.use('/api/todo-app', require('./routes/todoApp.js'));

app.listen(process.env.PORT, () => console.log(`Corriendo microservicio de ${MICROSERVICE_NAME} en el puerto ${process.env.PORT}`.magenta));
connectToDatabase(process.env.DATABASE_URI)
    .then(() => console.log(`Corriendo microservicio de ${MICROSERVICE_NAME}`.cyan))
    .catch(() => console.log('No se pudo conectar la base de datos'.red));