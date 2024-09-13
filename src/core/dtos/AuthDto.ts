export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface UserServiceResponseDto {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResponseDto {
  user: UserServiceResponseDto;
  accessToken: string;
  status?: number;
}

export interface ChangePasswordRequestDto {
  password: string;
  newPassword: string;
}
