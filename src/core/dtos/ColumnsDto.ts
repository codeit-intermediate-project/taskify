export interface ColumnServiceResponseDto {
  id: number;
  title: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateColumnRequestDto {
  title: string;
  dashboardId: number;
}

// get columns response DTO
export interface GetColumnsResponseDto {
  result: 'SUCCESS';
  data: ColumnServiceResponseDto[];
}

export interface FindColumnsRequestDto {
  dashboardId: number;
}

export interface UpdateColumnRequestDto {
  title: string;
}
