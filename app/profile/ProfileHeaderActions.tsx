import { Button } from '@/components/ui/button';

interface ProfileHeaderActionProps {
    className?: string;
    isGuildRecruiter?: boolean;
    isFollowing?: boolean;
}

const ProfileHeaderAction: React.FC<ProfileHeaderActionProps> = ({
    className,
    isGuildRecruiter = false,
}) => {
    return isGuildRecruiter ? (
        <div className={`flex w-full justify-center gap-2 ${className}`}>
            <Button className='w-20'>Follow</Button>
            <Button className='w-25'>Invite to Guild</Button>
        </div>
    ) : (
        <Button className='w-20'>Follow</Button>
    );
};

export default ProfileHeaderAction;
