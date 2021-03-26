const axios = require('axios')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

const CryptocurrencyType = new GraphQLObjectType({
  name: 'Cryptocurrencies',
  fields:() => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    symbol: {type: GraphQLString},
    amount: {type: GraphQLInt},
  })
})

RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields: {
    cryptocurrency:{
      type: CryptocurrencyType,
      args: {
        id:{type: GraphQLString}
      },
      resolve(parentValue, args){
        return axios.get('http://localhost:3000/cryptocurrencies/'+ args.id)
          .then(res => res.data);
      }
    },
    cryptocurrencies:{
      type: new GraphQLList(CryptocurrencyType),
      resolve(parentValue, args){
        return axios.get('http://localhost:3000/cryptocurrencies/')
          .then(res => res.data);
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields:{
    addCryptocurrency:{
      type:CryptocurrencyType,
      args:{
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        amount: {type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve(parentValue, args){
        return axios.post('http://localhost:3000/cryptocurrencies', {
          name: args.name,
          email: args.email,
          amount: args.amount
        })
        .then(res => res.data)
      }
    },
    deleteCryptocurrency:{
      type:CryptocurrencyType,
      args:{
        id:{type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, args){
        return axios.delete('http://localhost:3000/cryptocurrencies/'+ args.id)
        .then(res => res.data)
      }
    },
    editCryptocurrency:{
      type:CryptocurrencyType,
      args:{
        id:{type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        amount: {type: GraphQLInt},
      },
      resolve(parentValue, args){
        return axios.patch('http://localhost:3000/cryptocurrencies/'+ args.id, args)
        .then(res => res.data)
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})