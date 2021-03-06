const { GraphQLServer } = require("graphql-yoga");
const axios = require("axios");

const typeDefs = `
  type Query {
    getPokemon(id: Int!): Pokemon!
    allPokemon: [Pokemon]
  }

  type Pokemon {
    id: Int
    name: String
    height: Int
    abilities: [AbilityObj]
    stats: [StatObj]
  }

  type AbilityObj {
    slot: Int
    is_hidden: Boolean
    ability: Ability
  }

  type Ability {
    name: String
    url: String
  }

  type StatObj {
    effort: Int
    base_stat: Int
    stat: Stat
  }

  type Stat {
    name: String
    url: String
  }
`;

const resolvers = {
  Query: {
    getPokemon: async (_, { id }) => {
      let res = await axios(`http://pokeapi.co/api/v2/pokemon/${id}`)
      return res.data
    },
    allPokemon: (root, args, context) => {
      return axios(`http://pokeapi.salestock.net/api/v2/pokemon`).then(response => {
        return response.data.results
      })
    }
  }
}

const server = new GraphQLServer({typeDefs, resolvers })
server.start(() => console.log("Server is running at http://localhost:4000"))