const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const GraphQLSchema = require('./Schema/schema.js')

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: GraphQLSchema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Server is running on port 4000...');
});