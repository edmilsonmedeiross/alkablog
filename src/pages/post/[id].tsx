import { fetchCommentsPosts } from '@/services/helpers';
import { CommentProps } from '@/types/commentsTypes';
import { atom, useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { loadablePosts } from '../index';

const initialState: CommentProps[] = [];

const coMmentsAtom = atom(initialState);

function DetailPost() {
  const [posts] = useAtom(loadablePosts);
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? parseInt(router.query.id) : 0;
  const [comments, setComments] = useAtom(coMmentsAtom);
  
  useEffect(() => {
    async function fetch() {
      const response: Array<CommentProps> = await fetchCommentsPosts(id);
      setComments(response);
    }

    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  if (posts.state !== 'hasData') return <div>Carregando...</div>;

  const post = posts.data.find((post) => post.id === Number(id));

  return (
    <>
      <div>DetailPost</div>
      {post && (
        <div>
          <h1 className='font-medium'>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      )}
      <section>
        <p>Comentários</p>
        <div>
          {comments && comments.map((comment: CommentProps) => (
            <div key={comment.id}>
              <h4 className='font-bold underline'>{comment.name}</h4>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      </section>
      <Link href='/'>Voltar</Link>
    </>
  );
}

export default DetailPost;