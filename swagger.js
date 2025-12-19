const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'Retro Championship',
    description: '',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    // { name: 'User', description: 'Gestion des utilisateurs' },
    // { name: 'Tournament', description: 'Gestion des tournois' },
    // { name: 'Match', description: 'Gestion des matchs' },
    // { name: 'Game', description: 'Gestion des jeux' },
    // { name: 'Channel', description: 'Gestion des chaines' },
    // { name: 'Prize', description: 'Gestion des prix' },
  ],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: '',
    },
  },
  definitions: {
    UserSignup: {
      $mail: 'jeandujardin@example.com',
      $password: '123456',
      $username: 'jean19',
      $birthday: '1975-06-19',
      $city: 'Paris',
      $userStatus: 'Viewer',
    },
    UserLogin: {
      $mail: 'jeandujardin@example.com',
      $password: '123456',
    },
  },
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

swaggerAutogen(outputFile, routes, doc);