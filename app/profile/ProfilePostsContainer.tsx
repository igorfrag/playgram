interface ProfilePostsContainerProp {
    className?: string;
    children?: React.ReactNode;
}

const ProfilePostsContainer: React.FC<ProfilePostsContainerProp> = ({
    className,
    children,
}) => {
    return (
        <div className={`grid w-full grid-cols-3 ${className}`}>{children}</div>
    );
};

export default ProfilePostsContainer;
