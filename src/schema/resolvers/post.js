import data from '../data.js';

const Post = {
  author: (post) => {
    return data.users.find((user) => user.id === post.author);
  },
  likes: (post) => {
    return post.likes.map((userId) =>
      data.users.find((user) => user.id === userId)
    );
  },
};

export default Post;
