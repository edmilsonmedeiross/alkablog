// import { atom } from 'jotai';
import { UserProps } from '@/types/userTypes';
import { atom } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { fetchPosts } from '../services/helpers';
import { PostProps } from '../types/postsTypes';

// cria atomos da home
export const [posts] = atomsWithQuery<PostProps[]>(() => ({
  queryKey: ['posts'],
  queryFn: fetchPosts,
}));
export const usersAtom = atom([] as UserProps[]);
export const isNextVisibleAtom = atom(true);
export const isPrevVisibleAtom = atom(false);
export const pageAtom = atom(1);

