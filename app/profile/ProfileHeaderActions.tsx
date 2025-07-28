'use client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toggleFollowUser } from '@/lib/api';
import { useEffect, useState } from 'react';

interface ProfileHeaderActionProps {
    className?: string;
    isGuildRecruiter?: boolean;
    isFollowing?: boolean;
    userId: number;
    onFollowChange?: () => void;
}

const ProfileHeaderAction: React.FC<ProfileHeaderActionProps> = ({
    className,
    isGuildRecruiter = false,
    isFollowing,
    userId,
    onFollowChange,
}) => {
    const { user } = useAuth();
    const isOwnProfile = user?.id === userId;
    const handleToggleFollow = async () => {
        try {
            const res = await toggleFollowUser(userId);
            onFollowChange?.();
        } catch (err) {
            console.error('Follow error:', err);
        }
    };
    if (!user || isOwnProfile) return null;

    return isGuildRecruiter ? (
        <div className={`flex w-full justify-center gap-2 ${className}`}>
            <Button className='w-20' onClick={handleToggleFollow}>
                {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
            <Button className='w-25'>Invite to Guild</Button>
        </div>
    ) : (
        <Button className='w-20' onClick={handleToggleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
    );
};

export default ProfileHeaderAction;
