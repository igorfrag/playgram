'use client';
import { useState, useEffect } from 'react';
import ProfileHeader from '../ProfileHeader';
import ProfilePost from '../ProfilePost';
import ProfilePostsContainer from '../ProfilePostsContainer';
import { getUserById } from '@/lib/api';
import { useParams } from 'next/navigation';

export default function ProfilePage() {
    const params = useParams();
    const userId = Number(params?.id);

    const [profile, setProfile] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const data = await getUserById(userId);
            setProfile(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (!profile) return <p>Profile not found</p>;
    return (
        <div className='mx-auto flex h-fit w-full max-w-5xl flex-col items-center bg-black'>
            <ProfileHeader
                username={profile.username}
                imgSrc={profile.profilePicture}
                posts={profile.postsCount}
                followers={profile.followerCount}
                following={profile.followingCount}
                userId={profile.id}
                onFollowChange={() => fetchProfile()}
                isFollowing={profile.isFollowing}
            >
                {profile.bio}
            </ProfileHeader>
            <ProfilePostsContainer userId={userId}></ProfilePostsContainer>
        </div>
    );
}
