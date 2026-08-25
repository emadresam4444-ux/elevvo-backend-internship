export type Login = {
    uuid: string;
    username: string;
    password: string;
    md5: string;
    sha1: string;
    registered: string;
};
export type User = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    birthDate: string;
    login: Login;
};
export type Posts = {
    id: number;
    slug: string;
    url: string;
    title: string;
    content: string;
    image: string;
    thumbnail: string;
    status: string;
    category: string;
    publishedAt: string;
    updatedAt: string;
    userId: number;
};
export type Comments = {
    id: number;
    postId: number;
    userId: number;
    comment: string;
};
//# sourceMappingURL=types.d.ts.map