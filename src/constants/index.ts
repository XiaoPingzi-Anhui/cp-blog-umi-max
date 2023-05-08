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

/** 以下颜色用于图表中颜色，包括不仅限于折线图、柱状图、饼图等，颜色先后次序按下面顺序排列循环 */
export const colorLists = [
  '#3986fe', // blue
  '#f26279', // pink
  '#f9d237', // yellow
  '#35caca', // seagreen
  '#73e6bf', // lightgreen
  '#4cca72', // green
  '#f57f50', // orange
  '#db80d1', // purpose
  '#9d8aee', // lightpurpose
  '#529ceb', // lightblue
  '#965ee3', // darkpurpose
  '#f08882', // lightorange
  '#60c3d2', // lightseageen
  '#edb965', // lightyellow
  '#7d90db', // slateblue
  '#9cd88a', // grassgreen
];

export const tagColors = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];
