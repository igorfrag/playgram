import ProfileHeader from './ProfileHeader';
import ProfilePost from './ProfilePost';
import ProfilePostsContainer from './ProfilePostsContainer';

export default function ProfilePage() {
    return (
        <div className='mx-auto flex h-fit w-full max-w-5xl flex-col items-center bg-black'>
            <ProfileHeader
                imgSrc='https://avatar.iran.liara.run/public/17'
                posts={329}
                followers={1200}
                following={300}
            >
                User Name 📍Venore Mgmt: email@email.com
                tony@prettygoodagents.com STREAM VOL. 4
            </ProfileHeader>
            <ProfilePostsContainer>
                <ProfilePost postComments={2244} postLikes={1231} />
                <ProfilePost postComments={2244} postLikes={1231} />
                <ProfilePost postComments={2244} postLikes={1231} />
                <ProfilePost postComments={2244} postLikes={1231} />
                <ProfilePost postComments={2244} postLikes={1231} />
            </ProfilePostsContainer>
        </div>
    );
}
