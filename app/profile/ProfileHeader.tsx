import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from '@/components/ui/card';
import ProfileHeaderAction from './ProfileHeaderActions';

interface ProfileHeaderProps {
    children?: React.ReactNode;
    imgSrc: string;
    posts?: number;
    followers?: number;
    following?: number;
    username?: string;
    guildname?: string;
    isFollowing: boolean;
    userId: number;
    onFollowChange?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    children,
    imgSrc,
    posts,
    followers,
    following,
    username = 'Username',
    guildname = 'Guildname',
    onFollowChange,
    isFollowing,
    userId,
}) => {
    const HeaderCounters = [
        { label: 'Posts', value: posts },
        { label: 'Followers', value: followers },
        { label: 'Following', value: following },
    ];

    return (
        <>
            <Card className='flex w-full flex-col rounded-none border-0 shadow-none'>
                <div className='grid w-full grid-cols-3 grid-rows-2 items-center'>
                    <img
                        className='col-span-1 row-span-2 m-6 mx-auto aspect-square w-32 self-center rounded-full object-contain max-sm:w-[80px]'
                        src={imgSrc || '/user/avatar.jpg'}
                    />
                    <div className='min-sm:col-start-2 min-sm:col-span-1 align-center col-span-2 col-start-2 flex justify-center gap-6'>
                        <CardTitle>{username}</CardTitle>
                        <CardDescription>{guildname}</CardDescription>
                    </div>
                    <ProfileHeaderAction
                        userId={userId}
                        className='min-sm:row-start-1 min-sm:col-start-3 min-sm:col-span-1 col-span-2 col-start-2 row-start-2'
                        isGuildRecruiter={false}
                        onFollowChange={onFollowChange}
                        isFollowing={isFollowing}
                    />
                    <Card className='col-span-2 col-start-2 row-start-2 flex w-full items-center border-0 shadow-none max-sm:hidden'>
                        <CardContent className='w-full px-0'>
                            <div className='mx-auto grid grid-cols-3 gap-10'>
                                {HeaderCounters.map((item, index) => (
                                    <div
                                        className='flex flex-col items-center'
                                        key={index}
                                    >
                                        <span className='font-bold'>
                                            {item.value}
                                        </span>
                                        <span className='text-muted-foreground'>
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <CardContent className='max-w-1/2 mr-auto text-left'>
                        {children}
                    </CardContent>
                </div>
            </Card>
            <Card className='min-sm:hidden flex w-full flex-col items-center rounded-none'>
                <CardContent>
                    <div className='mx-auto grid grid-cols-3 gap-4'>
                        {HeaderCounters.map((item, index) => (
                            <div className='flex flex-col' key={index}>
                                <span className='font-bold'>{item.value}</span>
                                <span className='text-muted-foreground'>
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default ProfileHeader;
