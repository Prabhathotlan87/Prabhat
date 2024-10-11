const postsContainer = document.getElementById('postsContainer');
const postButton = document.getElementById('postButton');
const postContent = document.getElementById('postContent');

let posts = []; // In-memory database

// Function to render posts
function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <div class="post-content">
                ${post.content} 
                <span class="likes">${post.likes} ❤️</span>
                <span class="post-date">${new Date(post.date).toLocaleString()}</span>
            </div>
            <button onclick="likePost(${index})">Like</button>
            <button onclick="deletePost(${index})">Delete Post</button>
            <button id="followButton${index}" onclick="toggleFollow(${index})">
                ${post.following ? 'Unfollow' : 'Follow'}
            </button>
            <div class="comments">
                <input type="text" id="usernameInput${index}" placeholder="Your username" required>
                <input type="text" id="commentInput${index}" placeholder="Add a comment" required>
                <button onclick="addComment(${index})">Comment</button>
                <div class="comment-list" id="commentList${index}">
                    ${post.comments.map((comment, commentIndex) => `
                        <div class="comment">
                            <strong>${comment.username}:</strong> ${comment.text}
                            <button onclick="deleteComment(${index}, ${commentIndex})">Delete</button>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="emoji-container">
                <span class="emoji" onclick="addEmoji(${index}, '😊')">😊</span>
                <span class="emoji" onclick="addEmoji(${index}, '😢')">😢</span>
                <span class="emoji" onclick="addEmoji(${index}, '😂')">😂</span>
                <span class="emoji" onclick="addEmoji(${index}, '😡')">😡</span>
            </div>
        `;
        postsContainer.appendChild(postDiv);
    });
}

// Function to post new content
postButton.addEventListener('click', () => {
    const content = postContent.value.trim();
    if (content) {
        posts.push({ content, likes: 0, comments: [], following: false, date: new Date() });
        postContent.value = '';
        renderPosts();
        updateLocalStorage();
    }
});

// Function to like a post
function likePost(index) {
    posts[index].likes += 1;
    renderPosts();
    updateLocalStorage();
}

// Function to delete a post
function deletePost(index) {
    posts.splice(index, 1);
    renderPosts();
    updateLocalStorage();
}

// Function to follow/unfollow a post
function toggleFollow(index) {
    posts[index].following = !posts[index].following;
    renderPosts();
    updateLocalStorage();
}

// Function to add a comment
function addComment(index) {
    const usernameInput = document.getElementById(`usernameInput${index}`);
    const commentInput = document.getElementById(`commentInput${index}`);
    const username = usernameInput.value.trim();
    const comment = commentInput.value.trim();
    if (username && comment) {
        posts[index].comments.push({ username, text: comment });
        usernameInput.value = '';
        commentInput.value = '';
        renderPosts();
        updateLocalStorage();
    }
}

// Function to delete a comment
function deleteComment(postIndex, commentIndex) {
    posts[postIndex].comments.splice(commentIndex, 1);
    renderPosts();
    updateLocalStorage();
}

// Function to add an emoji
function addEmoji(index, emoji) {
    posts[index].comments.push({ username: 'Anonymous', text: emoji });
    renderPosts();
    updateLocalStorage();
}

// Load posts from local storage on initial load
window.onload = () => {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    if (storedPosts) {
        posts = storedPosts;
        renderPosts();
    }
};

// Update local storage whenever posts change
function updateLocalStorage() {
    localStorage.setItem('posts', JSON.stringify(posts));
}
