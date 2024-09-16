export interface CreateCommentRequestDto {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}
export interface CommentServiceDto {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  cardId: number;
  author: {
    profileImageUrl: string | null;
    nickname: string;
    id: number;
  };
}
export interface UpdateCommentRequestDto {
  content: string;
}
