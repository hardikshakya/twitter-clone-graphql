import { v4 as uuidv4 } from 'uuid';

import data from '../../data.js';

const Mutation = {
  createPost: (_, { content, authorId }) => {
    const newPost = {
      id: uuidv4(),
      content,
      author: data.users.find((user) => user.id === authorId) ? authorId : null,
      likes: [],
      likeCount: 0,
    };
    if (newPost.author) {
      data.posts.push(newPost);
      return newPost;
    }
    throw new Error('Author not found');
  },

  updatePost: (_, { id, content }) => {
    const post = data.posts.find((post) => post.id === id);
    if (post) {
      post.content = content;
      return post;
    }
    throw new Error('Post not found');
  },

  deletePost: (_, { id }) => {
    const postIndex = data.posts.findIndex((post) => post.id === id);
    if (postIndex > -1) {
      data.posts.splice(postIndex, 1);
      return `Post with id ${id} was deleted.`;
    }
    throw new Error('Post not found');
  },

  toggleLikePost: (_, { postId, userId }) => {
    const post = data.posts.find((post) => post.id === postId);
    const user = data.users.find((user) => user.id === userId);

    if (!post || !user) {
      throw new Error('Post or User not found');
    }

    const userIndex = post.likes.findIndex((u) => u === userId);

    if (userIndex >= 0) {
      // User has already liked the post, so unlike it
      post.likes.splice(userIndex, 1);
    } else {
      // User has not liked the post, so like it
      post.likes.push(user.id);
    }

    post.likeCount = post.likes.length;
    return post;
  },
};

export default Mutation;
