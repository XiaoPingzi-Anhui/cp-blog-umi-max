export default (initialState: InitialState) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  const { userInfo } = initialState;
  const { authority } = userInfo || {};
  return {
    isTourist: authority === '游客',
    canEdit: authority !== '游客',
  };
};
