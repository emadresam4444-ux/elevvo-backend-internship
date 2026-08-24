"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints = [
    'https://jsonplaceholder.org/users',
    'https://jsonplaceholder.org/posts',
    'https://jsonplaceholder.org/comments'
];
const USERS_API = async (endpoint) => {
    return await fetch(endpoint);
};
console.log(USERS_API);
//# sourceMappingURL=index.js.map