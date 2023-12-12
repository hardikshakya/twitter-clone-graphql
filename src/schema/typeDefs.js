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

  type Mutation {
    createPost(content: String!, authorId: ID!): Post
    updatePost(id: ID!, content: String!): Post
    deletePost(id: ID!): String
    toggleLikePost(postId: ID!, userId: ID!): Post
  }
`;

export default typeDefs;
