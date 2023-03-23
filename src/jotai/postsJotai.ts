// import { atom } from 'jotai';
import { atom } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { fetchPosts } from '../services/helpers';
import { PostProps } from '../types/postsTypes';

export const [posts] = atomsWithQuery<PostProps[]>(() => ({
  queryKey: ['posts'],
  queryFn: fetchPosts,
}));

export const darkModeAtom = atom<boolean>(false);
