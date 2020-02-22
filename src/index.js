import { GraphQLServer } from 'graphql-yoga';
import { users } from './data';
import db from './db';

// typeDefs
// Scalar - String, Boolean, Int, Float, ID

// sample data

const resolvers = {
  Query: {
    users(parent, args, {db}, info) {
      if (!args.query) {
        return db.users;
      } else {
        return db.users.filter(user =>
          user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
        );
      }
    },
    posts(parent, args, {db}, info) {
      if (!args.query) {
        return db.posts;
      } else {
        const titleInPosts = db.posts.filter(post =>
          post.title.toLocaleLowerCase().includes(args.query)
        );
        const bodyInPosts = db.posts.filter(post =>
          post.title.toLocaleLowerCase().includes(args.query)
        );
        return titleInPosts || bodyInPosts;
      }
    },

    comments(parent, args, {db}, info) {
      return db.comments;
    },
  },
  Mutation: {
    createUser(parent, args, {db}, info) {
      const isUserExist = db.users.some(user => user.email === args.data.email);
      if (isUserExist) {
        throw new Error('User Already Exist');
      }

      let user = {
        id: 'A903726',
        ...args.data
      };
      db.users.push(user);

      return user;
    },

    createPost(parent, args, {db}, info) {
      const isUserExist = db.users.some(user => user.id === args.data.author);

      if (!isUserExist) {
        throw new Error('User Doesnt Exist');
      }

      let post = {
        id: `${new Date()}`,
        ...args.data
      };
      db.posts.push(post);
      return post;
    },
    deletePost(parent, args, {db}, info) {
      const postFound = db.posts.find(post => post.id === args.id);
      db.posts = db.posts.filter(post => post.id !== args.id);
      db.comments = db.comments.filter(comment => comment.post !== args.id);
      return postFound;
    },
    createComment(parent, args, {db}, info) {
      const isUserExist = db.users.some(user => user.id === args.data.author);
      const postFound = db.posts.find(post => post.id === args.data.post);

      if (!isUserExist) {
        throw new Error('User doesnt Exist');
      } else if (!postFound) {
        throw new Error('Post doesnt Exist');
      } else if (postFound && !postFound.published) {
        throw new Error('Post inst Published Yet');
      }

      let comment = {
        id: `${new Date().toLocaleString()}`,
        ...args.data
      };

      db.comments.push(comment);

      return comment;
    }
  },
  Post: {
    author(parent, args, {db}, info) {
      // from every post object it extracts out author key
      return db.users.find(user => user.id === parent.author);
    },
    comments(parent, args, {db}, info) {
      return db.comments.filter(comment => {
        return parent.comments.includes(comment.id);
      });
    }
  },
  User: {
    posts(parent, args, {db}, info) {
      // so from data
      return db.posts.filter(post => post.author === parent.id);
    },
    comments(parent, args, {db}, info) {
      //parent.comments
      return db.comments.filter(comment => {
        return parent.comments.includes(comment.id);
      });
    }
  },
  Comment: {
    author(parent, args, {db}, info) {
      return db.users.find(user => user.id === parent.author);
    },
    post(parent, args, {db}, info) {
      return db.posts.find(post => post.id === parent.post);
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context :{
    db
  }
});
server.start(() => console.log('Server is running on localhost:4000'));
