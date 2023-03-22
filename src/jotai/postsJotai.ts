// import { atom } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { PostProps } from '../types/postsTypes';
import axios from 'axios';

// export const postsAtom = atom<PostProps[]>([]);

const fetchPosts = async (): Promise<PostProps[]> => {
  const posts: PostProps[] = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return posts;
};

export const [posts] = atomsWithQuery(() => ({
  queryKey: ['posts'],
  queryFn: fetchPosts
}));
