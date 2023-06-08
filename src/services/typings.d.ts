/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  enum ResInfo {
    Success = 'success',
    Failed = 'failed',
  }

  enum ResCode {
    OK = '',
    Failed = 'Internal Server Error',
  }

  interface PageInfo {
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Record<string, any>>;
  }

  interface PageInfo_UserInfo_ {
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<UserInfo>;
  }

  interface commonRes<T> {
    data?: T[];
    info: ResInfo;
    returnCode: ResCode;
    error?: any;
  }

  type UserGenderEnum = 'MALE' | 'FEMALE';

  interface ArticleInfo {
    _id: string;
    title: string;
    category: string;
    labels: string;
    readCount: number;
    createdAt: Date;
    updatedAt: Date;
    authorId?: string;
    authorName?: string;
    content?: string;
    likeStar?: number;
    ownSee?: boolean;
  }

  interface UserInfo {
    _id?: string;
    email?: string;
    authority?: string;
    createdAt?: Date;
    updatedAt?: Date;
    passwordHash?: string;
    password?: string;
    createArticles?: [];
    username?: string;
    sex?: string;
    phoneNumber?: string;
    likeArticlesId?: string;
    personalSignature?: string;
    avatarUrl?: string;
    age?: number;
    birthday?: Date;
  }
}
