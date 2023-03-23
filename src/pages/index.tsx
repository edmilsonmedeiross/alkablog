import { atom, useAtom } from 'jotai';
import { posts as postsAtom } from '../jotai/postsJotai';
import { dehydrate, QueryClient } from 'react-query';
import { fetchPosts, fetchUsers } from '@/services/helpers';
import { useEffect } from 'react';
import { loadable } from 'jotai/vanilla/utils';
import Link from 'next/link';
import Image from 'next/image';
import { UserProps } from '@/types/userTypes';
import Header from '@/components/Header';
import { 
  FaAngleRight, FaAngleDoubleRight,
  FaAngleLeft, FaAngleDoubleLeft
} from 'react-icons/fa';

const ONE = 1;
const PAGE_MAX = 10;

// cria átomos do jotai
export const usersAtom = atom([] as UserProps[]);
const isNextVisibleAtom = atom(true);
const isPrevVisibleAtom = atom(false);
const pageAtom = atom(1);
const slicedRenderPostsAtom = atom(async (get) => {
  const posts = await get(postsAtom);
  const page = get(pageAtom);
  return posts.slice((page - ONE) * PAGE_MAX, PAGE_MAX * page);
});

export const loadablePosts = loadable(slicedRenderPostsAtom);

export default function Home() {
  const [users, setUsers] = useAtom(usersAtom);
  const [allPosts] = useAtom(postsAtom);
  const [posts] = useAtom(loadablePosts);
  const [isNextVisible, setIsNextVisible] = useAtom(isNextVisibleAtom);
  const [isPrevVisible, setIsPrevVisible] = useAtom(isPrevVisibleAtom);
  const [page, setPage] = useAtom(pageAtom);
  
  const isVisible = page < allPosts.length / PAGE_MAX;

  useEffect(() => {
    if (posts.state === 'hasData') {
      setIsNextVisible(isVisible);
    }

    setIsPrevVisible(page > ONE);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, posts.state]);

  useEffect(() => {
    async function fetch() {
      const users = await fetchUsers();
      // gera uma url aleatória para o avatar do usuário com o robohash
      // https://robohash.org/
      users.forEach((user) => {
        const text = Math.random().toString(36).substring(7);
        user.avatar = `https://robohash.org/${text}.png?size=200x200`;
      });
      setUsers(users);
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      <Header />
      <main>
        <div className='w-full h-full mt-20'>
          <article className='p-4 flex flex-wrap gap-5 justify-center'>
            {posts.state === 'hasData' && posts.data.map((post) => (
              <Link
                href={`/post/${post.id}`}
                key={ post.id }
                className='
                  flex flex-col justify-center items-center
                  w-72 shadow-md rounded-md
                  hover:bg-gray-200 transition
                  duration-300 ease-in-out text-center
                  bg-gray-100 h-72 p-5 mt-3
                  dark:bg-slate-500 dark:hover:bg-gray-700
                  dark:text-gray-900 dark:hover:text-gray-400
                  group
                  '
              >
                <div className='flex flex-col items-center gap-8'>
                  <h1 className='
                    font-semibold dark:text-gray-900
                    text-gray-800
                    dark:group-hover:text-white'
                  >
                    { post.title }
                  </h1>
                  <p>{ post.body }</p>
                </div>
              </Link>
            ))}
          </article>
        </div>
        <div className='flex justify-between'>
          <div className='ml-8'>
            {isPrevVisible && (
              <button onClick={() => setPage(1) } >
                <FaAngleDoubleLeft size={30}/>
              </button>
            )}

            {isPrevVisible && (
              <button onClick={() => setPage(page - 1)} >
                <FaAngleLeft size={30}/>
              </button>
            )}
          </div>
          <div className='mr-8'>
            {isNextVisible && (
              <button onClick={() => setPage(page + 1) } >
                <FaAngleRight size={30}/>
              </button>
            )}

            {isNextVisible && (
              <button onClick={() => setPage(allPosts.length / PAGE_MAX) } >
                <FaAngleDoubleRight size={30}/>
              </button>
            )}
          </div>
        </div>
        <div>
          <h3 
            className='
              font-bold text-2xl text-center mt-8 mb-8'
          >
            Top Leitores do Mês
          </h3>
          <section className='flex flex-auto flex-wrap gap-3'>
            {
              users.map((user: UserProps) => (
                <Link
                  className='
                    w-36 h-36 rounded-full flex
                    flex-col gap-y-8 items-center justify-center
                    hover:transform hover:scale-110
                    transition-transform duration-300 ease-in-out
                    mx-auto group'
                  key={user.id}
                  href={`user/${user.id}`}
                  id='users'
                >
                  <div className='flex flex-col gap-3 items-center'>
                    <Image
                      className='rounded-full object-fill'
                      src={user.avatar}
                      alt={user.username}
                      width={70}
                      height={70}
                    />
                    <p 
                      className='
                        text-center text-xs font-semibold group-hover:text-blue-600
                        transition-colors duration-300
                        dark:group-hover:text-yellow-500'
                    >
                      {user.username}
                    </p>
                  </div>
                </Link>
              ))
            }
          </section>
        </div>
      </main>
    </>
  );
}


export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('posts', fetchPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
