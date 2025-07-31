'use client';

import { getUserPosts } from '@/lib/api';
import type { Post as PostType } from '@/types';
import { useEffect, useState } from 'react';
import ProfilePost from './ProfilePost';

interface ProfilePostsContainerProp {
    userId: number;
}

const ProfilePostsContainer: React.FC<ProfilePostsContainerProp> = ({
    userId,
}) => {
    const [posts, setPosts] = useState<PostType[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const data = await getUserPosts(userId);
                setPosts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!posts) return <p>No posts</p>;

    return (
        <div className={`max-xs:grid-cols-2 grid w-full grid-cols-3`}>
            {posts.map((post, index) => {
                return (
                    <ProfilePost
                        key={index}
                        postComments={post.commentsCount}
                        postLikes={post.likesCount}
                        imageUrl={post.imageUrl}
                        caption={post.caption}
                    />
                );
            })}
        </div>
    );
};

export default ProfilePostsContainer;
