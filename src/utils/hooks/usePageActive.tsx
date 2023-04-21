import { useLocation, matchPath } from 'react-router-dom';

/**
 * 判断页面当前是否在展示
 * @param pathname 要判断的页面路径
 * @returns
 */
export default function usePageActive(pathname: string) {
  const location = useLocation();
  return matchPath(location.pathname, pathname);
}
