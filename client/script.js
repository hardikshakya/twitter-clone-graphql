const postsList = document.getElementById('postsList');

// Function to render posts
function renderPosts(posts) {
  postsList.innerHTML = '';
  posts.forEach((post) => {
    const postItem = document.createElement('li');
    postItem.innerHTML = `
          ${post.content} 
          <span class="like-count">Likes: ${post.likeCount}</span>
          <br>
          <br>
          <button onclick="likePost('${post.id}')">Toggle Like</button>
      `;
    postsList.appendChild(postItem);
  });
}

// Fetch initial list of posts
async function fetchPosts() {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          posts {
            id
            content
            likeCount
          }
        }
      `,
    }),
  });
  const responseBody = await response.json();
  renderPosts(responseBody.data.posts);
}

// Function to handle like button click
async function likePost(postId) {
  await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation {
          toggleLikePost(postId: "${postId}", userId: "1") {
            id
            likeCount
          }
        }
      `,
    }),
  });
}

fetchPosts();

// Setup WebSocket connection
const socket = io('http://localhost:4000');

socket.on('likeCountUpdated', (data) => {
  fetchPosts(); // Re-fetch posts to update the UI
});
