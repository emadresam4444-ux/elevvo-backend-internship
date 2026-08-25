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
const data =await response.json() as T;
return data

}
async function dataEngine(){
    const userData =fetchData<User[]>(USERS_API)
    const postsData =fetchData<Posts[]>(POSTS_API)
    const commentsData =fetchData<Comments[]>(COMMENTS_API)

    const results=await Promise.allSettled([userData,postsData,commentsData]);
    const [usersResult, postsResult, commentsResult] = results;
 function processResult<T>(res:PromiseSettledResult<T>,name:string):T{
    if (res.status==='fulfilled'){
        return res.value;
    }else{
        console.error(`${name} API Failed:`, res.reason);
      return [] as unknown as T;
    }
 }
const users=processResult<User[]>(usersResult,'User');
const posts = processResult<Posts[]>(postsResult, 'Posts');
const comments = processResult<Comments[]>(commentsResult, 'Comments');

    return { users, posts, comments };

}

dataEngine().then((data)=>{
    console.log('Users count:', data.users.length); 
    console.log('Posts count:', data.posts.length);
    console.log('Comments count:', data.comments.length);
})