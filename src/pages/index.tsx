import { atom, useAtom } from 'jotai';
import { posts as postsAtom } from '../jotai/postsJotai';
import { dehydrate, QueryClient } from 'react-query';
import { fetchPosts } from '@/services/helpers';
import { useEffect } from 'react';
import { loadable } from 'jotai/vanilla/utils';
import Link from 'next/link';

const ONE = 1;
const PAGE_MAX = 10;

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

  console.log(posts);
  // console.log(posts.data);

  return (
    <>
      <main>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <div>
          <article className='mx-auto p-4' >
            {posts.state === 'hasData' && posts.data.map((post) => (
              <Link href={`/${post.id}`} key={ post.id } >
                <div className='my-px'>
                  <h1 className='font-bold underline'>{ post.title }</h1>
                  <p>{ post.body }</p>
                </div>
              </Link>
            ))}
          </article>
        </div>
        {isPrevVisible && <button onClick={() => setPage(page - 1)} >Prev</button>}
        {isNextVisible && <button onClick={() => setPage(page + 1) } >Next</button>}
        {isNextVisible && <button onClick={() => setPage(allPosts.length / PAGE_MAX) } >Ultima</button>}
        {isPrevVisible && <button onClick={() => setPage(1) } >Primeira</button>}
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
