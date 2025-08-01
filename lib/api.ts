import type { Post, UserPreview } from '@/types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// -------------- AUTH --------------------

// ============ LOGIN  ============
export const loginUser = async (email: string, password: string) => {
    const res = await fetch(`${apiUrl}` + `users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Login failed');
    }

    const data = await res.json();
    return data.user;
};

// ============ REGISTER  ============
export const registerUser = async (
    email: string,
    username: string,
    fullName: string,
    password: string
) => {
    const res = await fetch(`${apiUrl}` + `users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, username, fullName, password }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Login failed');
    }

    const data = await res.json();
    return data;
};
// ============ GET ME  ============
export const getMe = async () => {
    const res = await fetch(`${apiUrl}` + `users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Get me failed');
    }

    const result = await res.json();
    return result.data;
};

// -------------- POSTS --------------------

// ============ GET POST ============
export const getPostById = async (postId: number): Promise<Post> => {
    const res = await fetch(`${apiUrl}` + `posts/${postId}`, {
        credentials: 'include',
        cache: 'no-store',
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Error fetching post');
    return json.data.post;
};
// ============ POST NEW POST ============
export const createNewPost = async (
    caption: string,
    image: File
): Promise<Post> => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);

    const res = await fetch(`${apiUrl}` + `posts/new`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
        cache: 'no-store',
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Error creating post');
    return json.data.post;
};

//============ GET FEED ============
export const getUserFeed = async (): Promise<Post[]> => {
    const res = await fetch(`${apiUrl}` + `posts/`, {
        credentials: 'include',
        cache: 'no-store',
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Error fetching feed');
    return json.data.posts;
};

//============ GET USER POSTS  ============
export const getUserPosts = async (userId: number): Promise<Post[]> => {
    const res = await fetch(`${apiUrl}` + `users/${userId}/posts`, {
        credentials: 'include',
        cache: 'no-store',
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Error fetching posts');
    return json.data.posts;
};
//============ POST TOGGLE LIKE  ============
export const togglePostLike = async (postId: number) => {
    const res = await fetch(`${apiUrl}posts/${postId}/like`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error liking/unliking post');
    }

    return res.json();
};

// -------------- COMMENTS --------------------

//============ GET POST COMMENTS  ============
export async function getCommentsByPostId(
    postId: number,
    skip: number,
    take: number
) {
    const res = await fetch(
        `${apiUrl}comments/${postId}?skip=${skip}&take=${take}`,
        {
            method: 'GET',
            credentials: 'include',
            cache: 'no-store',
        }
    );

    if (!res.ok) {
        throw new Error('Error fetching comments');
    }

    const result = await res.json();
    return result.data;
}
//============ POST NEW COMMENT  ============
export const createCommentOnPost = async (postId: number, content: string) => {
    const res = await fetch(`${apiUrl}comments/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({ content }),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error commenting on post');
    }
    const result = await res.json();
    return result.data;
};

// -------------- USERS --------------------

export const getUserById = async (id: number): Promise<UserPreview> => {
    const res = await fetch(`${apiUrl}` + `users/id/${id}`, {
        credentials: 'include',
        cache: 'no-store',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error fetching user');
    return data;
};

export const toggleFollowUser = async (id: number) => {
    const res = await fetch(`${apiUrl}` + `users/${id}/follow`, {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error following user');
    return data;
};
