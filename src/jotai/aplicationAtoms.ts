import { UserProps } from '@/types/userTypes';
import { atom } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { fetchPosts } from '../services/helpers';
import { PostProps } from '../types/postsTypes';
import { loadable } from 'jotai/vanilla/utils';

const ONE = 1;
const PAGE_MAX = 10;

// cria atomos da home
export const slicedRenderPostsAtom = atom(async (get) => {
  const posts = await get(postsAtom);
  const page = get(pageAtom);
  return posts.slice((page - ONE) * PAGE_MAX, PAGE_MAX * page);
});

export const loadablePosts = loadable(slicedRenderPostsAtom);
export const [postsAtom] = atomsWithQuery<PostProps[]>(() => ({
  queryKey: ['posts'],
  queryFn: fetchPosts,
}));
export const usersAtom = atom<UserProps[]>([]);
export const isNextVisibleAtom = atom(true);
export const isPrevVisibleAtom = atom(false);
export const pageAtom = atom(1);
export const personAtom = atom<UserProps | null>(null);

// cria o atomo de tema
export const isResolvedAtom = atom(false);