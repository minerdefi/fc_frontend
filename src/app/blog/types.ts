export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    date: string;
    author: {
        name: string;
        avatar: string;
    };
}
