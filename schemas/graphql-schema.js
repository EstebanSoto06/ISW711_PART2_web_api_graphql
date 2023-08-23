const { buildSchema } = require('graphql');

const schemaString = `
  type Prompt {
    tag: String
    type: String
    userID: String
    data: JSON
  }

  scalar JSON

  type Query {
    getPrompts(userID: String!): [Prompt]
    byType(userID: String!, type: String!): [Prompt]
    byTag(userID: String!, tag: String!): [Prompt]
  }
`;

const graphQLschema = buildSchema(schemaString);

module.exports = { graphQLschema };