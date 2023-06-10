import { useRouter } from 'next/router';
import Image from 'next/image';
import useCurrentUser from '@/hooks/useCurrentUser';
import { getServerSideProps } from '@/lib/authUtils';
import { useSession, getProviders } from 'next-auth/react';

export default function Profiles() {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const { data, status } = useSession();

  return (
    <div className='flex items-center h-full justify-center'>
      <div className='flex flex-col'>
        <h1 className='text-3xl md:text-6xl text-white text-center'>
          Who is watching?
        </h1>
        <div className='flex items-center justify-center gap-8 mt-10'>
          <div onClick={() => router.push('/')}>
            <div className='group flex-row w-44 mx-auto'>
              <div className='w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'>
                <img src='/images/default-green.png' alt='user-icon' />
              </div>
              <div className='mt-4 text-gray-400 text-3xl text-center group-hover:text-white'>
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { getServerSideProps };
