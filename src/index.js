import { GraphQLServer } from 'graphql-yoga'

// typeDefs
// Scalar - String, Boolean, Int, Float, ID

const typeDefs = `
    type Query {
        id: ID!
        name: String!
        employed: Boolean!
        age: Int!
        gpa: Float
    }`;

const resolvers = {
    Query: {
        id() {
            return '34as498lo';
        },
        name() {
            return 'Aakash Ohri';
        },
        employed() {
            return true;
        },
        age() {
            return 30;
        },
        gpa() {
            return 8.56;
        }
    }
}

const server = new GraphQLServer({typeDefs, resolvers});
server.start(() => console.log('Server is running on localhost:4000'))