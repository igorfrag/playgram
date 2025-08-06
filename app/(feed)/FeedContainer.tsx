'use client';
import React, { useState, useEffect } from 'react';
import { getUserFeed } from '@/lib/api';
import type { Post as PostType } from '@/types';
import PostContainer from '@/components/Post/PostContainer';

interface FeedContainerProps {}

const FeedContainer: React.FC<FeedContainerProps> = ({}) => {
    const [posts, setPosts] = useState<PostType[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const data = await getUserFeed();
                setPosts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeed();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!posts) return <p>Failed to fetch Feed</p>;

    return (
        <div className='bg-background mx-auto flex h-screen max-w-5xl flex-col items-center'>
            {posts.map((post, index) => {
                return <PostContainer postId={post.id} key={index} />;
            })}
        </div>
    );
};

export default FeedContainer;
