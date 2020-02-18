import {GraphQLServer} from 'graphql-yoga';
import { users, posts, comments } from './data';

// typeDefs
// Scalar - String, Boolean, Int, Float, ID

// sample data

const typeDefs = `
    type Query {
        greeting(name: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
        me: User!
        post: Post!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
    }

    type Mutation {
        createUser(name: String!, email: String!, age:Int): User!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post
    } 

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
        gpa: Float
        isEmployed: Boolean!
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }
    `;

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      } else {
        return users.filter(user =>
          user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase()),
        );
      }
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      } else {
        const titleInPosts = posts.filter(post =>
          post.title.toLocaleLowerCase().includes(args.query),
        );
        const bodyInPosts = posts.filter(post =>
          post.title.toLocaleLowerCase().includes(args.query),
        );
        return titleInPosts || bodyInPosts;
      }
    },

    comments(parent, args, ctx, info) {
      return comments;
    },
    greeting(parent, args, ctx, info) {
      console.log('args::', args);
      return `Hello my name is ${args.name}`;
    },
    grades() {
      return [4, 9, 1];
    },
    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      } else {
        return args.numbers.reduce((acc, curr) => acc + curr);
      }
    },
    me() {
      return {
        id: 'ASHFY6453',
        name: 'Aakash Ohri',
        age: 30,
        gpa: null,
        isEmployed: true,
      };
    },
  },
  Mutation : {
      createUser(parent, args, ctx, info) {
            const isUserExist = users.some(user => user.email === args.email);
            if(isUserExist) {
                throw new Error('User Already Exist');
            }

            let user = {
                id: 'A903726',
                email: args.email,
                age: args.age,
                name: args.name,
            }
            users.push(user);

            return user;
      }
  },
  Post: {
    author(parent, args, ctx, info) {
      // from every post object it extracts out author key
      return users.find(user => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
        return comments.filter(comment => {
            return parent.comments.includes(comment.id);
        })
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      // so from data
      return posts.filter(post => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
        //parent.comments
        return comments.filter(comment => {
            return parent.comments.includes(comment.id);
        })
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
        return posts.find(post => post.id === parent.post);
    }
  },
};

const server = new GraphQLServer({typeDefs, resolvers});
server.start(() => console.log('Server is running on localhost:4000'));
