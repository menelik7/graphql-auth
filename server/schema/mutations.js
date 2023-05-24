const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;
const UserType = require('./types/user_type');
const AuthService = require('../services/auth');
const { GraphQLError } = require('graphql');

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { username, email, password }, req) {
        return AuthService.signup({ username, email, password, req });
      },
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        return AuthService.logout(req);
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parentValue, { email, password }, req) {
        try {
          const response = await AuthService.login({ email, password, req });
          return response;
        } catch (err) {
          throw new GraphQLError(err);
        }
      },
    },
  },
});

module.exports = mutation;
