import data from '../../data.js';

const Query = {
  posts: () => data.posts,
  post: (_, { id }) => data.posts.find((post) => post.id === id),
  user: (_, { id }) => data.users.find((user) => user.id === id),
};

export default Query;
