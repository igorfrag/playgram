export type Post = {
    id: number;
    userId: number;
    caption: string;
    imageUrl: string;
    likesCount: number;
    commentsCount: number;
    createdAt: string;
    isLiked: boolean;
    user: UserPreview;
};

export type Comment = {
    id: number;
    content: string;
    createdAt: string;
    user: {
        id: number;
        username: string;
        profilePicture?: string;
    };
};

type UserPreview = {
    id: number;
    username: string;
    profilePicture: string | 'public/user/avatar.jpg';
};
