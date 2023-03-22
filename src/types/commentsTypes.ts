export interface CommentProps {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface ApiResponseComments {
  data: CommentProps[];
}