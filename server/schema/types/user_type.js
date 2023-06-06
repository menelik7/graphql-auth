// TODO - Add comments...

const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    username: { type: GraphQLString },
    id: { type: GraphQLID },
    email: { type: GraphQLString },
  },
});

module.exports = UserType;
