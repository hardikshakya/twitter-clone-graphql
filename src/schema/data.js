const users = [
  { id: '1', username: 'hardik.shakya', verified: true },
  { id: '2', username: 'elon.musk', verified: false },
  { id: '3', username: 'new.user1', verified: true },
];

const posts = [
  {
    id: '1',
    content: 'Hello world!',
    author: '1',
    likes: ['2', '3'],
    likeCount: 2,
  },
];

export default { users, posts };
