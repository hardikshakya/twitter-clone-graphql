const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    verified: Boolean!
  }

  type Post {
    id: ID!
    content: String!
    author: User!
    likes: [User]!
    likeCount: Int!
  }

  type Query {
    posts: [Post]
    post(id: ID!): Post
    user(id: ID!): User
  }
`;

export default typeDefs;
