export interface AssigneeDto {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
}

export interface CardServiceResponseDto {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: Date | null;
  assignee: AssigneeDto | null;
  imageUrl: string | null;
  teamId: string;
  columnId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetCardsResponseDto {
  cursorId: number;
  totalCount: number;
  cards: CardServiceResponseDto[];
}

export interface CreateCardRequestDto {
  assigneeUserId?: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate?: string;
  tags: string[];
  imageUrl?: string;
}

export interface FindCardsRequestDto {
  size?: number;
  cursorId?: number;
  columnId: number;
}

export interface UpdateCardRequestDto {
  columnId?: number;
  assigneeUserId?: number | null;
  title?: string;
  description?: string;
  dueDate?: string | null;
  tags?: string[];
  imageUrl?: string | null;
}
