export const ACCESS_TOKEN = 'access_token';
/** token 有效时长，默认一个月 */
export const TOKEN_VALIDITY_PERIOD = 60 * 60 * 24 * 30;

/** 用户权限 */
export enum Authority {
  WEBMASTER = '站长',
  ADMINISTRATOR = '管理员',
  GENERAL_REGISTERED_USER = '普通注册用户',
  TOURIST = '游客',
}
