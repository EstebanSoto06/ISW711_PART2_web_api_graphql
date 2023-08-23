const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
require('dotenv').config();
const graphqlSchema = require('./schemas/graphql-schema'); 
const resolvers = require('./controllers/promptsController');
const { buildSchema } = require('graphql');

const app = express();

// Configurar conexión a la base de datos MongoDB
mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch(error => {
    console.error('Error de conexión a MongoDB:', error);
  });

  // Parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Check for cors
const cors = require("cors");
const { parse } = require('querystring');

app.use(cors({
  domains: '*',
  methods: "*"
}));

const schemaString = `
  type Prompt {
    tag: String
    type: String
    userID: String
    data: JSON
  }

  scalar JSON

  type Query {
    promptsByUserID(userID: String!, type: String, tag: String): [Prompt]
  }
`;

const schema = buildSchema(schemaString);

// Configurar middleware GraphQL
app.use(
  '/api/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true // Habilitar GraphiQL para pruebas
  })
);

// Iniciar el servidor
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Servidor GraphQL funcionando en el puerto `  + PORT);
});