'use client';

import { useEffect, useState } from 'react';
import { Post as PostType, getPostById } from '@/lib/api';
import Post from '@/components/Post/Post';

const PostContainer = ({ postId }: { postId: number }) => {
    const [post, setPost] = useState<PostType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(postId);
                setPost(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) return <p>Loading...</p>;
    if (!post) return <p>Post not found</p>;

    return <Post post={post} />;
};

export default PostContainer;
