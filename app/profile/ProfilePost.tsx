interface ProfilePostProp {
    className?: string;
    postLikes: number;
    postComments: number;
    imageUrl: string;
    caption: string;
}

const ProfilePost: React.FC<ProfilePostProp> = ({
    className,
    postLikes,
    postComments,
    imageUrl = 'https://placebear.com/500/500',
    caption,
}) => {
    return (
        <div
            className={`group relative mx-[1px] mb-0.5 aspect-[4/6] min-h-[164px] w-full min-w-[125px] ${className}`}
        >
            <img
                src={process.env.NEXT_PUBLIC_API_URL + imageUrl}
                alt={caption}
                className='aspect-auto h-full w-full overflow-hidden object-cover hover:opacity-20'
            />
            <div className='-translate-1/2 pointer-events-none absolute left-1/2 top-1/2 text-white opacity-0 group-hover:opacity-100'>
                <div>
                    <span>❤️ {postLikes}</span> <span>🗨️ {postComments}</span>
                </div>
            </div>
        </div>
    );
};

export default ProfilePost;
