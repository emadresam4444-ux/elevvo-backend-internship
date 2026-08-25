"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const USERS_API = 'https://jsonplaceholder.org/users';
const POSTS_API = 'https://jsonplaceholder.org/posts';
const COMMENTS_API = 'https://jsonplaceholder.org/comments';
//fetch api
async function fetchData(endpoint) {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
}
// fetchData<User[]>(USERS_API).then((users) => {
//     console.log('Users:', users);
// });
// fetchData<Posts[]>(POSTS_API).then((posts) => {
//     console.log('Posts:', posts);
// });
// fetchData<Comments[]>(COMMENTS_API).then((comments) => {
//     console.log('Comments:', comments);
// });
const user = fetchData(USERS_API).then((value) => { return value; });
const posts = fetchData(POSTS_API).then((value) => { return value; });
const comments = fetchData(COMMENTS_API).then((value) => { return value; });
function dataEngine() {
    return Promise.allSettled([user, posts, comments]);
}
//# sourceMappingURL=index.js.map