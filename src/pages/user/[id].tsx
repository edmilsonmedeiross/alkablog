import { atom, useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UserProps } from '../../types/userTypes';
import Image from 'next/image';
import Header from '@/components/Header';
import { MdEmail } from 'react-icons/md';
import { AiOutlineGlobal } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';

const usersAtom = atom<UserProps[]>([]);

function UserDetail() {
  const router = useRouter();
  const [users, setUsers] = useAtom(usersAtom);
  const { id } = router.query;

  useEffect(() => {
    if (localStorage.getItem('users')) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      setUsers(users);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!users) return <div>Carregando...</div>;

  const user = users.find((user) => user.id === Number(id));
  
  console.log(users);
  
  return (
    <div className='w-screen h-screen flex flex-col items-center'>
      <Header />
      {user && (
        <div className='
          flex gap-3
          items-center justify-center
          p-4 shadow-lg rounded-md
          w-96 mx-auto mt-60
          dark:bg-gray-700
          '
        >
          <div className='
            flex flex-col items-center justify-center
          '
          >
            <Image
              className='
                rounded-full
              '
              src={user.avatar}
              alt={user.name}
              width={200}
              height={200}
              priority={true}
            />
            <p className='font-semibold text-base dark:text-gray-300'>
              {user.username}
            </p>
          </div>
          <div className='
            flex flex-col items-center justify-center
            gap-3
          '
          >
            <h1 
              className='
                font-medium flex items-center gap-2 w-full
                dark:text-gray-300
              '
            >
              <FaUserAlt size={30} />
              {user.name}
            </h1>
            <p className='
              flex items-center gap-2
              w-full text-blue-600
            dark:text-blue-500
              dark:font-extrabold
              '
            >
              <MdEmail size={30}/>
              {user.email}
            </p>
            <p className='
              flex items-center gap-2
              w-full text-blue-600
              dark:text-blue-500
              dark:font-extrabold
              '
            >
              <AiOutlineGlobal size={30}/>
              {user.website}
            </p>
          </div>
        </div>
      )}
    </div>
  );}

export default UserDetail;