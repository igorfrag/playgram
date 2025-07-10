interface ProfilePostProp {
    className?: string;
    postLikes?: number;
    postComments?: number;
}

const ProfilePost: React.FC<ProfilePostProp> = ({
    className,
    postLikes,
    postComments,
}) => {
    return (
        <div
            className={`group relative mx-[1px] mb-0.5 min-h-[164px] min-w-[125px] ${className}`}
        >
            <img
                src='https://placebear.com/500/500'
                alt=''
                className='aspect-auto w-full hover:opacity-20'
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
