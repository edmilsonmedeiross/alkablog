import { PostProps, ApiResponsePosts } from '../types/postsTypes';
import { ApiResponseComments, CommentProps } from '@/types/commentsTypes';
import axios from 'axios';
import { ApiResponseUsers, UserProps } from '@/types/userTypes';

export const fetchPosts = async (): Promise<PostProps[]> => {
  const { data }: ApiResponsePosts = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

export const fetchCommentsPosts = async (id: number): Promise<CommentProps[]> => {
  const { data }: ApiResponseComments = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
  return data;
};

export const fetchUsers = async (): Promise<UserProps[]> => {
  const { data }: ApiResponseUsers = await axios.get('https://jsonplaceholder.typicode.com/users');
  return data;
};

