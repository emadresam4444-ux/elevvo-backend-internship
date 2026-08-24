import type{ User, Posts, Comments } from './types';
const USERS_API = 'https://jsonplaceholder.org/users';
const POSTS_API = 'https://jsonplaceholder.org/posts';
const COMMENTS_API = 'https://jsonplaceholder.org/comments';
//fetch api
async function  fetchData<T>(endpoint:string):Promise<T>{
const response = await fetch(endpoint);
if (!response.ok){
    throw new Error(`HTTP Error: ${response.status}`)
}
const data =await  response.json() as T;
return data
}
fetchData<User[]>(USERS_API).then((users) => {
    console.log('Users:', users);
});

fetchData<Posts[]>(POSTS_API).then((posts) => {
    console.log('Posts:', posts);
});

fetchData<Comments[]>(COMMENTS_API).then((comments) => {
    console.log('Comments:', comments);
});