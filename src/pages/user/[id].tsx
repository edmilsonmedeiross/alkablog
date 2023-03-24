import { atom, useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UserProps } from '../../types/userTypes';
import Image from 'next/image';

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
    <div>
      <div>UserDetail</div>
      {user && (
        <div>
          <p>{user.username}</p>
          <Image
            src={user.avatar}
            alt={user.name}
            width={200}
            height={200}
            priority={true}
          />
          <h1 className='font-medium'>{user.name}</h1>
          <p>{user.email}</p>
          <p>{user.website}</p>
        </div>
      )}
    </div>
  );}

export default UserDetail;