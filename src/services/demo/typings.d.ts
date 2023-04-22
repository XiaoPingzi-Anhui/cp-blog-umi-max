/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface PageInfo {
    /** 
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Record<string, any>>;
  }

  interface PageInfo_UserInfo_ {
    /** 
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<UserInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_UserInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_UserInfo_;
  }

  interface Result_UserInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  type UserGenderEnum = 'MALE' | 'FEMALE';

  interface UserInfoVO {
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
  }

  type definitions_0 = null;

  interface ArticleInfo {
    articlesId?: string;
    title?: string;
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
    author?: UserInfo;
    authorId?: string;
    tags?: string;
    categories?: string;
    likeCount?: string;
    viewCount?: string;
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
