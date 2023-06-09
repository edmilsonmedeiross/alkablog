import Header from '@/components/Header';
import { loadablePosts } from '@/jotai/aplicationAtoms';
import { fetchCommentsPosts } from '@/services/helpers';
import { CommentProps } from '@/types/commentsTypes';
import { atom, useAtom } from 'jotai';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaAngleLeft } from 'react-icons/fa';

const initialState: CommentProps[] = [];
const coMmentsAtom = atom(initialState);

function DetailPost() {
  const [posts] = useAtom(loadablePosts);
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? parseInt(router.query.id) : 0;
  const [comments, setComments] = useAtom(coMmentsAtom);
  
  useEffect(() => {
    async function fetch() {
      const response: CommentProps[] = await fetchCommentsPosts(id);
      setComments(response);
    }

    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  if (posts.state !== 'hasData') return <div>Carregando...</div>;

  const post = posts.data.find((post) => post.id === Number(id));

  return (
    <>
      <Head>
        <title>Detalhes | {post?.title}</title>
      </Head>
      <Header />
      {post && (
        <section className='
        container mx-auto
        p-4 text-center flex
        flex-col gap-4 max-w-2xl
        '
        >
          <div
            className='
              flex flex-col
              shadow-md rounded-md
              h-96 justify-evenly
              hover:transition hover:duration-300
              p-4 dark:bg-gray-700
              '
          >
            <h1 className='
              text-2xl dark:text-gray-300'
            >
              {post.title}
            </h1>
            <p className='
              dark:text-gray-300'
            >
              {post.body}
            </p>
          </div>
        </section>
      )}
      <section className='
      container mx-auto
      p-4 text-center flex
      flex-col gap-4 max-w-2xl
      '
      >
        <p className='
          font-semibold text-2xl
        text-stone-600 mt-8 mb-8
        dark:text-gray-300
         '
        >
          Comentários
        </p>
        <div
          className='flex flex-col gap-8'
        >
          {comments && comments.map((comment: CommentProps) => (
            <div
              key={comment.id}
              className='
                shadow-md p-4 rounded-md flex
                flex-col gap-8
                dark:bg-gray-700
                '
            >
              <h4 className='
                font-medium text-stone-800
                dark:text-gray-300'
              >
                {comment.name}
              </h4>
              <p className='font-light'>{comment.body}</p>
              <p className='font-medium text-blue-600'>{comment.email}</p>
            </div>
          ))}
        </div>
      </section>
      <div className='ml-8 w-4'>
        <Link href='/' className=''><FaAngleLeft size={35}/></Link>
      </div>
    </>
  );
}

export default DetailPost;